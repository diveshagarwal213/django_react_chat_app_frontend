/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosResponse,
  AxiosError,
  AxiosInstance,
  CreateAxiosDefaults,
} from "axios";
import { LocalStorageEnums } from "../../interfaces/global.enums";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + "/api/";
// Define the structure of a retry queue item
interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: any;
}

// Create a list to hold the request queue
const refreshAndRetryQueue: RetryQueueItem[] = [];

// Flag to prevent multiple token refresh requests
let isRefreshing = false;

// Function to refresh the access token
export const getAccessTokenFromRefresh = async (refresh: string) => {
  return await axios.post<{ access: string }>(
    `${API_BASE_URL}auth/jwt/refresh/`,
    {
      refresh,
    }
  );
};

// Define default configuration for Axios client
const defaultConfig: CreateAxiosDefaults = {
  baseURL: API_BASE_URL,
};

// Create an instance of Axios client with default configuration
const axiosClient: AxiosInstance = axios.create(defaultConfig);

// Interceptor for request
axiosClient.interceptors.request.use(
  (config) => {
    // Modify the request config before sending the request
    // For example, add headers or authentication tokens
    // console.log("Hi", config.headers.Authorization);
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Interceptor for response
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Process the response data
    // For example, parse response data or handle errors
    return response;
  },
  async (error: AxiosError) => {
    // Handle response error
    const status = error?.response?.status;
    const refreshToken = localStorage.getItem(LocalStorageEnums.REFRESH_TOKEN);

    if (status === 401 && refreshToken && error.config) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          // Refresh the access token
          const newAccessToken = await getAccessTokenFromRefresh(refreshToken);
          const token = `JWT ${newAccessToken.data.access}`;

          // Update the request headers with the new access token
          error.config.headers.Authorization = token;
          axiosClient.defaults.headers.common.Authorization = token;

          // Retry all requests in the queue with the new token
          refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
            config.headers["Authorization"] = token;
            axios
              .request(config)
              .then((response) => resolve(response))
              .catch((err) => reject(err));
          });

          // Clear the queue
          refreshAndRetryQueue.length = 0;

          // Retry the original request
          return axios(error.config);
        } catch (refreshError) {
          // Handling token refresh error
          // redirect the user to the login page
          localStorage.clear();
          window.location.href = "/";
          throw refreshError;
        } finally {
          isRefreshing = false;
        }
      }
      // Add the original request to the queue
      return new Promise<void>((resolve, reject) => {
        refreshAndRetryQueue.push({ config: error.config, resolve, reject });
      });
    }

    if (status === 401 && !refreshToken) {
      localStorage.clear();
      window.location.href = "/";
    }

    // Return a Promise rejection if the status code is not 401
    return Promise.reject(error);
  }
);

export default axiosClient;
