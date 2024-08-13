import { useMutation } from "@tanstack/react-query";
import get_axios_client from "../../../lib/axios/axios.lib";
import { LocalStorageEnums } from "../../../interfaces/global.enums";
import { useNavigate } from "react-router-dom";
import useUserStateHook from "../../StateHooks/useUserStateHook";

interface PayloadI {
  phone_number: string | number;
  otp: string;
  redirect?: string | null;
}
interface ResponseI {
  access_token: string;
  refresh_token: string;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gen_otp_api_client({ redirect, ...data }: PayloadI) {
  return get_axios_client
    .post<ResponseI>("/otp/auth/", data, {
      headers: {
        Authorization: null,
      },
    })
    .then((res) => {
      localStorage.setItem(
        LocalStorageEnums.REFRESH_TOKEN,
        res.data.refresh_token
      );
      get_axios_client.defaults.headers.common[
        "Authorization"
      ] = `JWT ${res.data.access_token}`;
      return res;
    });
}

function useOtpAuthApiHook() {
  const navigate = useNavigate();
  const sync_user = useUserStateHook((state) => state.sync_user);
  return useMutation(gen_otp_api_client, {
    onSuccess: (_, payload) => {
      navigate(payload.redirect || "/main/users/");
      sync_user();
    },
  });
}

export default useOtpAuthApiHook;
