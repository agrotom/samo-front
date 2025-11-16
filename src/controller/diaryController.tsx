import { saveTextEntity, getTextEntity, FOCUSES, INSIGHTS, THANKS, PROBLEMS, RESULTS, TOMORROW_MAIN_TASKS } from "@/api/diary";
import { create } from "zustand";

interface DiaryControllerState {
    focusText: string;
    setFocusText: (data: string) => void;
    insightText: string;
    setInsightText: (data: string) => void;
    thanksText: string;
    setThanksText: (data: string) => void;
    problemsText: string;
    setProblemsText: (data: string) => void;
    resultsText: string;
    setResultsText: (data: string) => void;
    tomorrowMainTasksText: string;
    setTomorrowMainTasksText: (data: string) => void;

    fetchData: () => Promise<void>;
}

const useDiaryController = create<DiaryControllerState>((set) => ({
    focusText: '',
    setFocusText: async data => {
        set(state => ({ ...state, focusText: data }));
        await saveTextEntity(FOCUSES, data); 
    },
    insightText: '',
    setInsightText: async data => {
        set(state => ({ ...state, insightText: data }));
        await saveTextEntity(INSIGHTS, data);
    },
    thanksText: '',
    setThanksText: async data => {
        set(state => ({ ...state, thanksText: data }));
        await saveTextEntity(THANKS, data);
    },
    problemsText: '',
    setProblemsText: async data => {
        set(state => ({ ...state, problemsText: data }));
        await saveTextEntity(PROBLEMS, data);
    },
    resultsText: '',
    setResultsText: async data => {
        set(state => ({ ...state, resultsText: data }));
        await saveTextEntity(RESULTS, data);
    },
    tomorrowMainTasksText: '',
    setTomorrowMainTasksText: async data => {
        set(state => ({ ...state, tomorrowMainTasksText: data }));
        await saveTextEntity(TOMORROW_MAIN_TASKS, data);
    },

    fetchData: async () => {
    }
}));

export default useDiaryController;