import type UniqueObject from "@/interfaces/uniqueObject";
import { API } from "./auth";
import { format } from "date-fns"

export interface TrackerData extends UniqueObject {
    name: string;
    currentStep: number;
    totalSteps: number;
    createdAt: Date;
}

export interface TrackerRequest {
    name: string;
    currentStep: number;
    totalSteps: number;
}

export interface TrackerDTO {
    id: number;
    name: string;
    currentStep: number;
    totalSteps: number;
    createdAt: string;
}

export async function addTracker(data: TrackerRequest): Promise<number> {
    return (await API.post("tracker", data)).data.id;
}

export async function modifyTracker(id: number, data: TrackerRequest): Promise<void> {
    await API.put(`tracker/${ id }`, data);
}

export async function removeTracker(id: number): Promise<void> {
    await API.delete(`tracker/${id}`);
}

export async function getTrackers(date: Date): Promise<TrackerData[]> {
    const trackers: TrackerDTO[] = (await API.get("tracker?date=" + format(date, "yyyy-LL-dd").slice(0, 10))).data.data ?? [];

    

    return trackers.map(dto => ({ id: dto.id, name: dto.name, currentStep: dto.currentStep, totalSteps: dto.totalSteps, createdAt: new Date(dto.createdAt) }));
}