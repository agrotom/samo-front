import type UniqueObject from "@/interfaces/uniqueObject";

export interface GoalData extends UniqueObject {
    id: number;
    completed: boolean;
    text: string;
    favorite: boolean;
    createdAt: Date;
}

export interface GoalDataRequest {
    completed: boolean;
    text: string;
    favorite: boolean;
}

export interface GoalDataDTO {
    id: number;
    completed: boolean;
    text: string;
    favorite: boolean;
    createdAt: string;
}