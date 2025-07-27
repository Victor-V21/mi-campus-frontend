import { create } from "zustand";

interface Count {
    count: number;
    increase: () => void;
    decrease: () => void;
}

export const useCountStore = create<Count>()((set) => ({
    count: 1,
    increase: () => {
        set((state) => ({ count: state.count + 1 }))
    },
    decrease: () => {
        set((state) => ({ count: state.count - 1 }))
    },
}))