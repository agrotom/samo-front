import { addTodayDeed, getTodayDeeds, modifyTodayDeed, removeTodayDeed, type TodayDeeds } from "@/api/diary";
import { create } from "zustand";
import useGlobalController from "@/controller/globalController"

interface StarsControllerState {
    todayDeeds: TodayDeeds[];
    addEmptyTodayDeed: () => void;
    modifyTodayDeed: (id: number, data: TodayDeeds) => void;
    removeTodayDeed: (id: number) => void;
    fetchData: (date: Date) => Promise<void>;
}

const useStarsController = create<StarsControllerState>((set) => ({
    todayDeeds: [],
    addEmptyTodayDeed: () => {
        const data: TodayDeeds = {
            id: 0,
            text: "Без названия",
            level: 0,
            createdAt: new Date()
        };

        (async () => {
            data.id = await addTodayDeed({ text: data.text, level: data.level });

            set(state => ({
                ...state,
                todayDeeds: [...state.todayDeeds, data ]
            }));
        })();
    },
    modifyTodayDeed: (id, data) => set(state => {
        if (!useGlobalController.getState().isModifyingAllowed) return state;

        modifyTodayDeed(id, { text: data.text, level: data.level });

        return ({
            ...state,
            todayDeeds: state.todayDeeds.map(oldData => {
                return oldData.id == id ? { ...data } : oldData
            })
        })
    }),
    removeTodayDeed: id => set(state => {
        if (!useGlobalController.getState().isModifyingAllowed) return state;
        
        removeTodayDeed(id);
        
        return ({
            ...state,
            todayDeeds: state.todayDeeds.filter(data => data.id != id)
        })
    }),
    fetchData: async (date: Date) => {
        const todayDeeds = await getTodayDeeds(date);

        set({
            todayDeeds: todayDeeds
        });
    }
}));

export default useStarsController;