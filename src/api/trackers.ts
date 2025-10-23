import { getUser } from "./auth";

export interface TrackerData {
    name: string;
    currentStep: number;
    totalSteps: number;
}

const trackerData: TrackerData[] = [
    {
        name: 'Тысячи шагов',
        currentStep: 5,
        totalSteps: 11
    },
    {
        name: 'Стаканы воды',
        currentStep: 4,
        totalSteps: 9
    },
    {
        name: 'Часы сна',
        currentStep: 3,
        totalSteps: 9
    },
    {
        name: 'Часы сна',
        currentStep: 3,
        totalSteps: 9
    },
    {
        name: 'Порций сладкого',
        currentStep: 1,
        totalSteps: 5
    }
];

export function setTracker(newData: TrackerData) {
    console.log(`Saving tracker ${ newData } to ${new Date()} by user ${getUser()}`);
}

export function getTrackers(): TrackerData[] {
    return trackerData;
}