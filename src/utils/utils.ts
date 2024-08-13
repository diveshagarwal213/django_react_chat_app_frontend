import { LocalStorageEnums } from "../interfaces/global.enums";
import { SaveProfileI } from "../interfaces/interface";
import { ShopT } from "../interfaces/shop.interface";
import { BaseUserInterface } from "../interfaces/user.interface";
import { UpdateLocalStorage, getLocalStorage } from "./localStorage.utils";

export function logout() {
  const refresh_token = localStorage.getItem(
    LocalStorageEnums.REFRESH_TOKEN
  ) as string;
  const user = getLocalStorage<BaseUserInterface>(LocalStorageEnums.USER);
  const shop = getLocalStorage<ShopT>(LocalStorageEnums.SHOP);
  let text;
  if (shop) text = shop.name;
  if (!text) text = user?.first_name || "";
  const saved_profile: SaveProfileI = {
    refresh_token,
    text,
  };
  localStorage.clear();
  UpdateLocalStorage(LocalStorageEnums.SAVED_PROFILES, saved_profile);
  window.location.href = "/";
}
