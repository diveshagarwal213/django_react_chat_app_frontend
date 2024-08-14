import { LocalStorageEnums } from "../interfaces/global.enums";
import { SaveProfileI } from "../interfaces/interface";
import { BaseUserT } from "../interfaces/user.interface";
import { UpdateLocalStorage, getLocalStorage } from "./localStorage.utils";

export function logout() {
  const refresh_token = localStorage.getItem(
    LocalStorageEnums.REFRESH_TOKEN
  ) as string;
  const user = getLocalStorage<BaseUserT>(LocalStorageEnums.USER);
  const saved_profile: SaveProfileI = {
    refresh_token,
    text: user?.first_name || user?.phone_number || "",
  };
  localStorage.clear();
  UpdateLocalStorage(LocalStorageEnums.SAVED_PROFILES, saved_profile);
  window.location.href = "/";
}
