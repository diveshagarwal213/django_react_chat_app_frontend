import { useMutation, useQuery } from "@tanstack/react-query";
import { InterestT, MyInterestT } from "../../../interfaces/interest.interface";
import axiosClient from "../../../lib/axios/axios.lib";
import { QueryKeyEnums } from "../../../interfaces/query.enums";
// import { QueryKeyEnums } from "../../../interfaces/query.enums";
type ParamsI = {
  search?: string;
  is_accepted?: boolean;
  ordering?: "id" | "-id" | "-created_at" | "created_at";
};

//list
function list_my_interests_api_client(params: ParamsI) {
  const url = `/my_app/interests/`;
  return axiosClient.get<Array<MyInterestT>>(url, { params: params });
}

export function useMyInterestApiHook(params: ParamsI) {
  return useQuery({
    queryKey: [QueryKeyEnums.LIST_INTERESTS, params],
    queryFn: (context) =>
      list_my_interests_api_client(context.queryKey[1] as ParamsI),
  });
}

//list
function retrieve_my_interests_api_client(id: unknown) {
  const url = `/my_app/interests/${id}/`;
  return axiosClient.get<MyInterestT>(url);
}

export function useRetrieveMyInterestApiHook(id: unknown, enabled = true) {
  return useQuery({
    queryKey: [QueryKeyEnums.RETRIEVE_INTEREST, id],
    queryFn: (context) => retrieve_my_interests_api_client(context.queryKey[1]),
    enabled,
  });
}

//post
function create_interest_api_client(data: Pick<InterestT, "sent_to">) {
  return axiosClient.post<InterestT>("/my_app/interests/", data);
}

export function useCreateInterestApiHook() {
  // const queryClient = useQueryClient();
  return useMutation(create_interest_api_client, {
    onSuccess: () => {
      // queryClient.invalidateQueries([QueryKeyEnums.LIST_USERS]);
    },
  });
}

//accept
function accept_interest_api_client(id: unknown) {
  return axiosClient.post<unknown>(`/my_app/interests/${id}/accept_interest/`);
}

export function useAcceptInterestApiHook() {
  // const queryClient = useQueryClient();
  return useMutation(accept_interest_api_client, {
    onSuccess: () => {
      // queryClient.invalidateQueries([QueryKeyEnums.LIST_USERS]);
    },
  });
}

//delete
function delete_interest_api_client(id: unknown) {
  return axiosClient.delete<unknown>(`/my_app/interests/${id}/`);
}

export function useDeleteInterestApiHook() {
  // const queryClient = useQueryClient();
  return useMutation(delete_interest_api_client, {
    onSuccess: () => {
      // queryClient.invalidateQueries([QueryKeyEnums.LIST_USERS]);
    },
  });
}
