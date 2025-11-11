import { LOREM } from "./diary";
import { LifeBrightness, type Balance } from "@/util/balanceWheel";
import type { GoalData } from "./goals";

export interface ObjectiveGoalData extends GoalData {
    deadLine: Date;
}

export interface ObjectiveData {
    id: number;
    label: string;
    text: string;
    favorite: boolean;
    balanceType: Balance;
    date: Date;
    image_url?: string;
    completed: boolean;
    goalsLabel: string;
    goals: ObjectiveGoalData[];
}

export function getMission() {
    return LOREM;
}

export var ALL_OBJECTIVES = [
        {
            id: 0,
            label: "Свадьба",
            text: "Свадьба это рабство",
            favorite: true,
            balanceType: LifeBrightness,
            date: new Date(2026, 9, 20),
            completness: 97
        },
        {
            id: 1,
            label: "Открыть свой магазин",
            text: "Свадьба это рабство",
            favorite: true,
            balanceType: LifeBrightness,
            date: new Date(2025, 11, 20),
            completness: 11
        },
        {
            id: 2,
            label: "Открыть свой магазин",
            text: "Свадьба это рабство",
            favorite: false,
            balanceType: LifeBrightness,
            date: new Date(2025, 11, 20),
            completness: 11
        },
        {
            id: 3,
            label: "Прыгнуть с парашютом",
            text: "Свадьба это рабство",
            favorite: true,
            balanceType: LifeBrightness,
            date: new Date(2026, 3, 20),
            completness: 50
        }
    ];

export function getAllObjectives(): ObjectiveData[] {
    return [
        {
            id: 0,
            label: "Свадьба",
            text: LOREM,
            favorite: true,
            balanceType: LifeBrightness,
            date: new Date(2026, 9, 20),
            completed: false,
            goalsLabel: "Без названия",
            goals: []
        },
        {
            id: 1,
            label: "Сделать открытие",
            text: "Просто открытие",
            favorite: true,
            balanceType: LifeBrightness,
            date: new Date(2025, 11, 20),
            completed: false,
            goalsLabel: "Без названия",
            goals: []
        },
        {
            id: 2,
            label: "Открыть свой магазин",
            text: "Просто открыть свой магазин",
            favorite: false,
            balanceType: LifeBrightness,
            date: new Date(2025, 11, 20),
            completed: false,
            goalsLabel: "Без названия",
            goals: []
        },
        {
            id: 3,
            label: "Прыгнуть с парашютом",
            text: "Просто прыгнуть",
            favorite: true,
            balanceType: LifeBrightness,
            date: new Date(2026, 3, 20),
            completed: false,
            goalsLabel: "Без названия",
            goals: []
        }
    ];
}

export function getFocusedObjectives(): ObjectiveData[] {
    return getAllObjectives().filter(data => data.favorite == true);
}

export function saveMission(text: string) {
    console.log(`Saving mission: ${ text } to ${new Date()} by user`);
}