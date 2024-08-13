import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../../../lib/axios/axios.lib";
import { QueryKeyEnums } from "../../../interfaces/query.enums";
import { ChatMessageT } from "../../../interfaces/chat_messages.interface";
type ParamsI = {
  interest_id: unknown;
  ordering?: "id" | "-id" | "-created_at" | "created_at";
};

//list
function list_chat_messages_api_client({ interest_id, ...params }: ParamsI) {
  const url = `/my_app/interests/${interest_id}/chat_messages/`;
  return axiosClient.get<Array<ChatMessageT>>(url, { params: params });
}

export function useListChatMessagesApiHook(
  params: ParamsI,
  options = { enabled: true }
) {
  return useQuery({
    queryKey: [QueryKeyEnums.LIST_CHAT_MESSAGES, params],
    queryFn: (context) =>
      list_chat_messages_api_client(context.queryKey[1] as ParamsI),
    enabled: options.enabled,
  });
}

interface ChatMessageCreateI {
  data: Pick<ChatMessageT, "message">;
  interest_id: unknown;
}

//post
function create_chat_message_api_client({
  interest_id,
  data,
}: ChatMessageCreateI) {
  return axiosClient.post<ChatMessageT>(
    `/my_app/interests/${interest_id}/chat_messages/`,
    data
  );
}

export function useCreateChatMessageApiHook() {
  const queryClient = useQueryClient();
  return useMutation(create_chat_message_api_client, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeyEnums.LIST_CHAT_MESSAGES]);
    },
  });
}
