import { UserAdditionalInfo } from "@/types/client.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface useUserDataProps {
  userData: UserAdditionalInfo;
  setUserData: (value: UserAdditionalInfo) => void;
}

const useUserData = create(
  persist<useUserDataProps>(
    (set) => ({
      userData: {
        birthDate: "",
        gender: "",
        nickName: "",
      },
      setUserData: (value: UserAdditionalInfo) => set({ userData: value }),
    }),
    {
      name: "userDataStorage",
    }
  )
);

export default useUserData;
