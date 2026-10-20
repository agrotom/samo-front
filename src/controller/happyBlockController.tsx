import { getSelfHappiness, getWeekHabits, getWorkHappiness, modifyWeekHabit, setSelfHappiness, setWorkHappiness, type WeekHabit } from "@/api/diary";
import { create } from "zustand";
import useGlobalController from "@/controller/globalController"

interface HappyBlockControllerState {

    workHappinessTracker: number;
    setWorkHappinessTracker: (data: number) => void;
    selfHappinessTracker: number;
    setSelfHappinessTracker: (data: number) => void;
    
    weekHabits: WeekHabit[];
    modifyWeekHabits: (id: number, data: WeekHabit) => void;
    
    fetchData: (date: Date) => Promise<void>;
}

const useHappyBlockController = create<HappyBlockControllerState>((set) => ({
    workHappinessTracker: 1,
    setWorkHappinessTracker: data => set(state => {
        if (!useGlobalController.getState().isModifyingAllowed) return state;

        setWorkHappiness(data);
        
        return ({
            ...state,
            workHappinessTracker: data
        });
    }),
    selfHappinessTracker: 1,
    setSelfHappinessTracker: data => set(state => {
        if (!useGlobalController.getState().isModifyingAllowed) return state;

        setSelfHappiness(data);

        return ({
            ...state,
            selfHappinessTracker: data
        });
    }),
    weekHabits: [],
    modifyWeekHabits: (id, data) => set(state => {
        if (!useGlobalController.getState().isModifyingAllowed) return state;
        
        modifyWeekHabit(data);
        
        return ({
            ...state,
            weekHabits: state.weekHabits.map(oldData => oldData.id == id ? { ...data } : oldData)
        });
    }),
    fetchData: async (date: Date) => {
        const workHappiness = await getWorkHappiness(date);
        const selfHappiness = await getSelfHappiness(date);

        const weekHabits = await getWeekHabits(date);

        set({
            workHappinessTracker: workHappiness,
            selfHappinessTracker: selfHappiness,
            weekHabits: weekHabits
        });
    }
}));

export default useHappyBlockController;