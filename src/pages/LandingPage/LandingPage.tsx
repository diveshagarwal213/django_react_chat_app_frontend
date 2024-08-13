import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  UpdateLocalStorage,
  getLocalStorage,
} from "../../utils/localStorage.utils";
import { LocalStorageEnums } from "../../interfaces/global.enums";
import { SaveProfileI } from "../../interfaces/interface";
import useUserStateHook from "../../hooks/StateHooks/useUserStateHook";

function LandingPage() {
  //sys hooks
  const navigate = useNavigate();
  //gb states
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const profile_data: any = getLocalStorage<SaveProfileI>(
    LocalStorageEnums.SAVED_PROFILES
  );

  const sync_user = useUserStateHook((state) => state.sync_user);

  //handlers
  function handle_continue_as() {
    UpdateLocalStorage(
      LocalStorageEnums.REFRESH_TOKEN,
      profile_data.refresh_token,
      {
        JsonStringify: false,
      }
    );
    sync_user();
    navigate("/main/users/");
  }
  function handle_get_started() {
    navigate("account/login");
  }
  return (
    <div className="p-5 flex flex-col items-center min-h-dynamic ">
      <div className="flex-grow flex flex-col justify-around ">
        <div>
          <h1 className="text-5xl font-bold text-center w-full text-primary primary-font-family">
            My Chat App
          </h1>
        </div>
        <div></div>
      </div>

      <div className="mt-5 space-y-3 w-full max-w-sm ">
        {!!profile_data && (
          <Button onClick={handle_continue_as} fullWidth variant="contained">
            Continue as {profile_data && profile_data.text}
          </Button>
        )}
        <Button
          onClick={handle_get_started}
          fullWidth
          variant={profile_data ? "outlined" : "contained"}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}

export default LandingPage;
