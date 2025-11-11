import { getTodayDeeds, type TodayDeeds } from "@/api/diary";
import { reserveID } from "@/util/uniqueObject";
import { create } from "zustand";

interface StarsControllerState {
    tomorrowMainTasksText: string;
    setTomorrowMainTasksText: (data: string) => void;
    todayDeeds: TodayDeeds[];
    addEmptyTodayDeed: () => void;
    modifyTodayDeed: (id: number, data: TodayDeeds) => void;
    removeTodayDeed: (id: number) => void;
}

const useStarsController = create<StarsControllerState>((set) => ({
    todayDeeds: getTodayDeeds(),
    tomorrowMainTasksText: '',
    setTomorrowMainTasksText: data => set(state => ({ ...state, thanksText: data })),
    addEmptyTodayDeed: () => set(state => ({
        ...state,
        todayDeeds: [...state.todayDeeds, { id: reserveID(state.todayDeeds), text: "Без названия", level: 0 }]
    })),
    modifyTodayDeed: (id, data) => set(state => ({
        ...state,
        todayDeeds: state.todayDeeds.map(oldData => {
            return oldData.id == id ? { ...data } : oldData
        })
    })),
    removeTodayDeed: id => set(state => ({
        ...state,
        todayDeeds: state.todayDeeds.filter(data => data.id != id)
    }))
}));

export default useStarsController;