import type UniqueObject from "@/util/uniqueObject";

export interface TrackerData extends UniqueObject {
    name: string;
    currentStep: number;
    totalSteps: number;
}

const trackerData: TrackerData[] = [];

export function saveTrackerData(newData: TrackerData) {
    console.log(`Saving tracker ${ newData } to ${ new Date() } by user`);
}

export function setTrackers(newData: TrackerData[]) {
    console.log(`Saving trackers ${ newData.map(data => data.currentStep) } to ${ new Date() } by user`);
}

export function getTrackers(): TrackerData[] {
    return trackerData;
}