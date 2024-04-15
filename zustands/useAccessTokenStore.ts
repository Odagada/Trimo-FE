import { create } from "zustand";

type AccessTokenStore = {
  accessToken: string;
  setAccessToken: (token: string) => void;
};

const useAccessTokenStore = create<AccessTokenStore>((set) => ({
  accessToken: "",
  setAccessToken: (token) => set(() => ({ accessToken: token })),
}));

export default useAccessTokenStore;
