import get_axios_client from "../../../lib/axios/axios.lib";
import { BaseUserInterface } from "../../../interfaces/user.interface";
import { DefaultPaginationType } from "../../../interfaces/interface";
import { useQuery } from "@tanstack/react-query";
import { QueryKeyEnums } from "../../../interfaces/query.enums";
import { InterestT } from "../../../interfaces/interest.interface";

//get
export function get_user_me_api_client() {
  return get_axios_client.get<BaseUserInterface>("core/user/me/");
}

//patch
export type PatchUserPayloadI = Partial<
  Omit<BaseUserInterface, "phone_number">
>;

export function patch_user_api_client(payload: PatchUserPayloadI) {
  return get_axios_client.patch<BaseUserInterface>("core/user/me/", payload);
}

interface ListUserInterface extends BaseUserInterface {
  sent_by: Array<InterestT>;
  sent_to: Array<InterestT>;
}

// list
export function list_shop_product_api_client() {
  const url = `/core/user/`;
  return get_axios_client.get<Array<ListUserInterface>>(url);
}

export function useListShopProductsApiHook() {
  return useQuery({
    queryKey: [QueryKeyEnums.LIST_USERS],
    queryFn: list_shop_product_api_client,
  });
}
