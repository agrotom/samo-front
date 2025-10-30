import { getFocus, getInsight, getProblems, getResults, getThanks, getTomorrowMainTasks } from "@/api/diary";
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
}

const useDiaryController = create<DiaryControllerState>((set) => ({
    focusText: getFocus(),
    setFocusText: data => set(state => ({ ...state, focusText: data })),
    insightText: getInsight(),
    setInsightText: data => set(state => ({ ...state, insightText: data })),
    thanksText: getThanks(),
    setThanksText: data => set(state => ({ ...state, thanksText: data })),
    problemsText: getProblems(),
    setProblemsText: data => set(state => ({ ...state, thanksText: data })),
    resultsText: getResults(),
    setResultsText: data => set(state => ({ ...state, thanksText: data })),
    tomorrowMainTasksText: getTomorrowMainTasks(),
    setTomorrowMainTasksText: data => set(state => ({ ...state, thanksText: data }))
}));

export default useDiaryController;