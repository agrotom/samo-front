import { saveTextEntity, getTextEntity, FOCUSES, INSIGHTS, THANKS, PROBLEMS, RESULTS, TOMORROW_MAIN_TASKS } from "@/api/diary";
import { create } from "zustand";
import useGlobalController from "@/controller/globalController"

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

    fetchData: (date: Date) => Promise<void>;
}

const useDiaryController = create<DiaryControllerState>((set) => ({
    focusText: '',
    setFocusText: async data => {
        set(state => {
            if (!useGlobalController.getState().isModifyingAllowed) return state;

            saveTextEntity(FOCUSES, data);

            return ({
                ...state,
                focusText: data
            })
        });
    },
    insightText: '',
    setInsightText: async data => {
        set(state => {
            if (!useGlobalController.getState().isModifyingAllowed) return state;

            saveTextEntity(INSIGHTS, data);

            return ({
                ...state,
                insightText: data
            })
        });
    },
    thanksText: '',
    setThanksText: async data => {
        set(state => {
            if (!useGlobalController.getState().isModifyingAllowed) return state;

            saveTextEntity(THANKS, data);

            return ({
                ...state,
                thanksText: data
            })
        });
    },
    problemsText: '',
    setProblemsText: async data => {
        set(state => {
            if (!useGlobalController.getState().isModifyingAllowed) return state;

            saveTextEntity(PROBLEMS, data);

            return ({
                ...state,
                problemsText: data
            })
        });
    },
    resultsText: '',
    setResultsText: async data => {
        set(state => {
            if (!useGlobalController.getState().isModifyingAllowed) return state;

            saveTextEntity(RESULTS, data);

            return ({
                ...state,
                resultsText: data
            })
        });
    },
    tomorrowMainTasksText: '',
    setTomorrowMainTasksText: async data => {
        set(state => {
            if (!useGlobalController.getState().isModifyingAllowed) return state;

            saveTextEntity(TOMORROW_MAIN_TASKS, data);

            return ({
                ...state,
                tomorrowMainTasksText: data
            })
        });
    },

    fetchData: async (date: Date) => {
        const focus = await getTextEntity(FOCUSES, date);
        const insight = await getTextEntity(INSIGHTS, date);
        const thanks = await getTextEntity(THANKS, date);
        const problems = await getTextEntity(PROBLEMS, date);
        const results = await getTextEntity(RESULTS, date);
        const tomorrowMainTasks = await getTextEntity(TOMORROW_MAIN_TASKS, date);

        set({
            focusText: focus,
            insightText: insight,
            thanksText: thanks,
            problemsText: problems,
            resultsText: results,
            tomorrowMainTasksText: tomorrowMainTasks
        });
    }
}));

export default useDiaryController;