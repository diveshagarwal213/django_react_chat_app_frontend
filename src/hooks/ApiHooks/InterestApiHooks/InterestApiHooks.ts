import { useMutation } from "@tanstack/react-query";
import { InterestT } from "../../../interfaces/interest.interface";
import axiosClient from "../../../lib/axios/axios.lib";
// import { QueryKeyEnums } from "../../../interfaces/query.enums";

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
