import { create } from "zustand";

interface GlobalControllerState {
    isModifyingAllowed: boolean;
    allowModifying: (value: boolean) => void;
    error: boolean;
    setError: (value: boolean) => void;
    loading: boolean;
    setLoading: (value: boolean) => void;
}

const useGlobalController = create<GlobalControllerState>((set) => ({
    isModifyingAllowed: false,
    allowModifying: value => set({
        isModifyingAllowed: value
    }),
    error: false,
    setError: value => set({
        error: value
    }),
    loading: true,
    setLoading: value => set({
        loading: value
    })
}));

export default useGlobalController;