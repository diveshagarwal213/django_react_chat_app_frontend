import { create } from "zustand";
import { BaseUserT } from "../../interfaces/user.interface";
import {
  PatchUserPayloadI,
  get_user_me_api_client,
  patch_user_api_client,
} from "../ApiHooks/UserApiHooks/UserApiHook";
import {
  UpdateLocalStorage,
  getLocalStorage,
} from "../../utils/localStorage.utils";
import { LocalStorageEnums } from "../../interfaces/global.enums";

interface StateI {
  user: BaseUserT | undefined;
  sync_user: () => Promise<BaseUserT | undefined>;
  patch_user: (payload: PatchUserPayloadI) => Promise<BaseUserT | undefined>;
}

const useUserStateHook = create<StateI>()((set, get) => ({
  user: getLocalStorage(LocalStorageEnums.USER),
  sync_user: async () => {
    try {
      const res = await get_user_me_api_client();
      UpdateLocalStorage(LocalStorageEnums.USER, res.data);
      set({ user: res.data });
      return res.data;
    } catch (error) {
      return undefined;
    }
  },
  patch_user: async (payload) => {
    try {
      const user = get().user;
      const res = await patch_user_api_client({ ...payload, id: user?.id });
      UpdateLocalStorage(LocalStorageEnums.USER, res.data);
      set({ user: res.data });
      return res.data;
    } catch (error) {
      return undefined;
    }
  },
}));

export default useUserStateHook;
