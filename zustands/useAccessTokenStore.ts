import { create } from "zustand";

type StateAction = {
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
};

const useAccessTokenStore = create<StateAction>((set) => ({
  accessToken: "",
  setAccessToken: (accessToken) => set({ accessToken: accessToken }),
}));

export default useAccessTokenStore;
