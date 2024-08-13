import { InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useNavigate, useSearchParams } from "react-router-dom";
import { OtpTypeEnums } from "../../../interfaces/global.enums";
import useGenOtpApiHook from "../../../hooks/ApiHooks/AuthHooks/useGenOtpApiHook";
import useOtpAuthApiHook from "../../../hooks/ApiHooks/AuthHooks/useOtpAuthApiHook";
import { BackArrowIconButton } from "../../../UI/Buttons/IconButtons";
import { form_error_handler } from "../../../utils/errors/error.utils";
import { BasicButton } from "../../../UI/Buttons/CustomButton";

type FormValues = {
  phone_number: number;
  otp: string;
};

export default function Login() {
  //sys hooks
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  //states
  const [isSecondStep, setIsSecondStep] = useState<boolean>(false);
  const [timer, setTimer] = useState(120); // Timer in seconds
  const [isTimerActive, setIsTimerActive] = useState(false);

  //schema

  // const formSchema = yup.object({
  //   phone_number: yup.number().min(5).required("Phone No. is Required"),
  //   OTP: yup.string().required("OTP is Required"),
  // });

  //form hook
  const {
    register,
    handleSubmit,
    formState,
    trigger,
    getValues,
    setFocus,
    setError,
    resetField,
  } = useForm<FormValues>();
  // resolver: yupResolver(formSchema),

  const { errors } = formState;

  useEffect(() => {
    setFocus("phone_number");
  }, [setFocus]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let interval: any;

    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isTimerActive]);

  useEffect(() => {
    if (timer === 0) {
      setIsTimerActive(false);
      setTimer(29);
    }
  }, [timer]);

  //API HOOKS
  // const { mutate } = useCreateUserHook();
  const { mutateAsync: generate_otp, isLoading: generate_otp_loading } =
    useGenOtpApiHook();
  const { mutateAsync: otp_auth, isLoading: otp_auth_loading } =
    useOtpAuthApiHook();
  // const { mutate: LoginMutate } = useLoginUserHook();

  //handlers
  function onSubmit(formData: FormValues) {
    otp_auth({
      otp: formData.otp,
      phone_number: "+91" + formData.phone_number,
      redirect: searchParams.get("redirect"),
    }).catch((err) => {
      form_error_handler(err, setError);
    });
  }

  function prevStepHandler() {
    if (isSecondStep) {
      setIsSecondStep(false);
      setIsTimerActive(false);
      setTimer(29);
    } else {
      navigate(-1);
    }
  }
  async function nextStepHandler() {
    if (!(await trigger("phone_number"))) return;
    const phone_number = "+91" + getValues("phone_number");
    generate_otp({
      otp_for: OtpTypeEnums.LOGIN_AND_REGISTER,
      phone_number: phone_number,
    })
      .then(() => {
        setIsTimerActive(true);
        setIsSecondStep(true);
        resetField("otp");
      })
      .catch((err) => {
        const error = form_error_handler(err, setError);
        if (Array.isArray(error) && error[0] === "NOT_EXPIRED") {
          setTimer(parseInt(error[1]));
          setIsTimerActive(true);
          setIsSecondStep(true);
          resetField("otp");
        }
      });
  }

  function retry() {
    const phone_number = "+91" + getValues("phone_number");
    generate_otp({
      otp_for: OtpTypeEnums.LOGIN_AND_REGISTER,
      phone_number: phone_number,
    });
    resetField("otp");
    setIsTimerActive(true);
  }

  //UI
  let UI_CONTENT = {
    heading: "Enter your phone number to get OTP",
  };

  if (isSecondStep) {
    UI_CONTENT = {
      heading: `Verify with OTP sent to`,
    };
  }

  return (
    <div className="flex justify-center min-h-dynamic">
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex px-5 py-2 flex-col max-w-sm w-full"
      >
        <div className="mb-5 -ml-2">
          <BackArrowIconButton onClick={prevStepHandler} />
        </div>
        <div className="mb-5 text-left  ">
          <h1 className="text-2xl  ">{UI_CONTENT.heading}</h1>
          {isSecondStep && (
            <p className="text-xl italic">{getValues("phone_number")}</p>
          )}
        </div>

        <div>
          {!isSecondStep && (
            <div>
              <TextField
                fullWidth
                type="number"
                aria-hidden
                label="Phone Number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+91</InputAdornment>
                  ),
                }}
                {...register("phone_number")}
                error={!!errors.phone_number}
                helperText={errors.phone_number?.message}
                margin="normal"
                placeholder="10 digit mobile number"
              />
            </div>
          )}

          {isSecondStep && (
            <TextField
              fullWidth
              type="number"
              aria-hidden
              label="OTP"
              {...register("otp", { required: true })}
              error={!!errors.otp}
              helperText={errors.otp?.message}
              margin="normal"
              placeholder="4 digit OTP"
            />
          )}
        </div>

        <div className="w-full mt-5">
          {!isSecondStep && (
            <BasicButton
              onClick={nextStepHandler}
              type="button"
              size="large"
              variant="contained"
              fullWidth
              disabled={generate_otp_loading}
              isLoading={generate_otp_loading}
            >
              Get OTP
            </BasicButton>
          )}
          {isSecondStep && (
            <BasicButton
              isLoading={otp_auth_loading}
              disabled={otp_auth_loading}
              type="submit"
              size="large"
              variant="contained"
              fullWidth
            >
              Continue
            </BasicButton>
          )}
        </div>
        {!isSecondStep && (
          <p className="mt-5 text-sm ">
            By click. I accept the &nbsp;
            <span className="underline font-medium">
              terms of service
            </span> and{" "}
            <span className="underline font-medium">privacy policy</span>.
          </p>
        )}
        {isSecondStep && (
          <div className="mt-5">
            <p>
              Didn't receive it ?
              <BasicButton
                onClick={retry}
                type="button"
                size="small"
                variant="text"
                disabled={isTimerActive}
                disableRipple={true}
                sx={{ minWidth: 0 }}
              >
                Retry
              </BasicButton>
              {isTimerActive && <span>in 00:{timer}</span>}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
