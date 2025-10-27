import { getUser } from "./auth";
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
    completness: number;
    image_url?: string;
}

export const EMPTY_OBJECTIVE: ObjectiveData = {
    id: 0,
    label: 'Без названия',
    text: '',
    favorite: false,
    balanceType: LifeBrightness,
    date: new Date(),
    completness: 0,
    image_url: undefined
}

export function createEmptyObjectiveData() {
    return (
        {
            id: 0,
            label: 'Без названия',
            text: '',
            favorite: false,
            balanceType: LifeBrightness,
            date: new Date(),
            completness: 0,
            image_url: undefined
        }   
    )
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
}

export function getFocusedObjectives(): ObjectiveData[] {
    return getAllObjectives().filter(data => data.favorite == true);
}

export function saveMission(text: string) {
    console.log(`Saving mission: ${ text } to ${new Date()} by user ${getUser()}`);
}