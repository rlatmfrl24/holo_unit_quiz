import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AdminState {
  isLogin: boolean;
  setIsLogin: (by: boolean) => void;
}

const useAdminStore = create<AdminState>()(
  devtools(
    persist(
      (set) => ({
        isLogin: false,
        setIsLogin: (by: boolean) => {
          set((state) => ({ isLogin: by }));
        },
      }),
      { name: "admin" }
    )
  )
);

export { useAdminStore };
