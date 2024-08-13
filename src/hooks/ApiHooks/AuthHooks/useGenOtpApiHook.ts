import { useMutation } from "@tanstack/react-query";
import get_axios_client from "../../../lib/axios/axios.lib";
import toast from "react-hot-toast";

interface PayloadI {
  phone_number: string;
  otp_for: string;
}
interface ResponseI {
  status: string;
  raw_otp?: string;
}
//Continue
function genOTPApi(data: PayloadI) {
  return get_axios_client.post<ResponseI>("/otp/gen/phone_number/", data, {
    headers: { Authorization: undefined },
  });
}

function useGenOtpApiHook() {
  return useMutation(genOTPApi, {
    onSuccess: (data) => {
      if (!data.data.raw_otp) return;
      toast.success(data.data.raw_otp, {
        duration: 10000,
        position: "top-center",
      });
    },
  });
}

export default useGenOtpApiHook;
