import { getSelfHappines, getTodayDeeds, getTomorrowMainTasks, getWeekHabits, getWorkHappines, type TodayDeeds, type WeekHabit } from "@/api/diary";
import type { TrackerData } from "@/api/trackers";
import { create } from "zustand";

interface HappyBlockControllerState {
    workHappinessTracker: number;
    setWorkHappinessTracker: (data: number) => void;
    selfHappinessTracker: number;
    setSelfHappinessTracker: (data: number) => void;
    
    weekHabits: WeekHabit[];
    modifyWeekHabits: (id: number, data: WeekHabit) => void;
}

const useHappyBlockController = create<HappyBlockControllerState>((set) => ({
    workHappinessTracker: getWorkHappines(),
    setWorkHappinessTracker: data => set(state => ({
        ...state,
        workHappinessTracker: data
    })),
    selfHappinessTracker: getSelfHappines(),
    setSelfHappinessTracker: data => set(state => ({
        ...state,
        selfHappinessTracker: data
    })),
    weekHabits: getWeekHabits(),
    modifyWeekHabits: (id, data) => set(state => ({
        ...state,
        weekHabits: state.weekHabits.map(oldData => oldData.id == id ? { ...data } : oldData)
    }))
}));

export default useHappyBlockController;