import type UniqueObject from "@/util/uniqueObject";

export interface GoalData extends UniqueObject {
    id: number;
    completed: boolean;
    text: string;
}

const goalsData: GoalData[] = [
];

export function getGoals() {
    return goalsData;
}