/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import { UseFormSetError } from "react-hook-form";

export function form_error_handler(
  error: any,
  setError: UseFormSetError<any> | undefined = undefined
) {
  const data: {
    [key: string]: Array<string>;
  } = error?.response?.data;

  if (!data) return;

  const non_field_errors: Array<string> | undefined = data?.non_field_errors;

  if (non_field_errors) {
    const errorValue = non_field_errors[0];
    if (errorValue === "ALREADY_EXIST") return errorValue;
    if (errorValue === "NOT_EXPIRED") {
      return non_field_errors;
    }
    toast.error(errorValue);
  } else {
    if (!setError) return;
    const errorList = Object.entries(data);
    for (const [key, value] of errorList) {
      const name = key;
      setError(name, { message: value[0] });
    }
  }
}
