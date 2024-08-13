import { useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { getAccessTokenFromRefresh } from "./lib/axios/axios.lib";
import { LocalStorageEnums } from "./interfaces/global.enums";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeyEnums } from "./interfaces/query.enums";

const WEBSOCKET_API_BASE_URL =
  import.meta.env.VITE_WEBSOCKET_API_BASE_URL + "/ws/";

type WebsocketResponseT = {
  stream: "notification_stream";
  payload: {
    message: "UPDATE_INTEREST" | "UPDATE_CHAT";
  };
};

function Websocket() {
  //states
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const [, setMessageHistory] = useState<WebsocketResponseT[]>([]);

  //react-query
  const queryClient = useQueryClient();

  //websocket
  const getSocketUrl = useCallback(() => {
    const refreshToken = localStorage.getItem(LocalStorageEnums.REFRESH_TOKEN);
    return getAccessTokenFromRefresh(refreshToken || "").then((res) => {
      return `${WEBSOCKET_API_BASE_URL}?token=${res.data.access}`;
    });
  }, []);
  const { readyState, lastJsonMessage } = useWebSocket<WebsocketResponseT>(
    getSocketUrl,
    {
      share: true,
      reconnectAttempts: 5,
      reconnectInterval: 5000,
      shouldReconnect: () => {
        return true;
      },
    }
  );

  //effects
  // useEffect(() => {
  //   console.log("Websocket rendered");
  // }, []);

  useEffect(() => {
    const connectionStatus = {
      [ReadyState.CONNECTING]: "Connecting",
      [ReadyState.OPEN]: "Open",
      [ReadyState.CLOSING]: "Closing",
      [ReadyState.CLOSED]: "Closed",
      [ReadyState.UNINSTANTIATED]: "Uninstantiated",
    }[readyState];
    const color = {
      [ReadyState.CONNECTING]: "yellow",
      [ReadyState.OPEN]: "green",
      [ReadyState.CLOSING]: "orange",
      [ReadyState.CLOSED]: "red",
      [ReadyState.UNINSTANTIATED]: "blue",
    }[readyState];
    console.info(`WebSocket %c ${connectionStatus}`, `color:${color};`);
  }, [readyState]);

  useEffect(() => {
    // console.log("lastJsonMessage");
    if (lastJsonMessage !== null) {
      console.log(lastJsonMessage.stream);
      console.log(lastJsonMessage.payload.message);
      if (lastJsonMessage.payload.message === "UPDATE_INTEREST") {
        queryClient.invalidateQueries([QueryKeyEnums.LIST_USERS]);
      }
      if (lastJsonMessage.payload.message === "UPDATE_CHAT") {
        queryClient.invalidateQueries([QueryKeyEnums.LIST_CHAT_MESSAGES]);
      }
    }
  }, [lastJsonMessage, queryClient]);

  return null;
}

export default Websocket;
