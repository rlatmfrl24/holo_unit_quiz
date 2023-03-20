import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface PageState {
  page: string;
  setPage: (by: string) => void;
}

const usePageStore = create<PageState>()(
  devtools(
    persist(
      (set) => ({
        page: "intro",
        setPage: (by: string) => set((state) => ({ page: by })),
      }),
      { name: "page" }
    )
  )
);

export { usePageStore };
