import type UniqueObject from "@/util/uniqueObject";
import { getUser } from "./auth";

export interface TrackerData extends UniqueObject {
    name: string;
    currentStep: number;
    totalSteps: number;
}

const trackerData: TrackerData[] = [
    {
        id: 0,
        name: 'Тысячи шагов',
        currentStep: 5,
        totalSteps: 11
    },
    {
        id: 1,
        name: 'Стаканы воды',
        currentStep: 4,
        totalSteps: 9
    },
    {
        id: 2,
        name: 'Часы сна',
        currentStep: 3,
        totalSteps: 9
    },
    {
        id: 3,
        name: 'Часы сна',
        currentStep: 3,
        totalSteps: 9
    },
    {
        id: 4,
        name: 'Порций сладкого',
        currentStep: 1,
        totalSteps: 5
    }
];

export function saveTrackerData(newData: TrackerData) {
    console.log(`Saving tracker ${ newData } to ${ new Date() } by user ${ getUser() }`);
}

export function setTrackers(newData: TrackerData[]) {
    console.log(`Saving trackers ${ newData.map(data => data.currentStep) } to ${ new Date() } by user ${ getUser() }`);
}

export function getTrackers(): TrackerData[] {
    return trackerData;
}