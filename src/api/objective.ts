import { BalanceTypes, type Balance } from "@/common/balanceWheel";
import type { GoalData } from "./goals";
import { API } from "./auth";

export interface ObjectiveGoalData extends GoalData {
    deadLine: Date;
}

export interface ObjectiveData {
    id: number;
    label: string;
    text: string;
    favorite: boolean;
    balanceType: Balance;
    deadLine: Date;
    image_url: string | null;
    completed: boolean;
    goalsLabel: string;
    goals: ObjectiveGoalData[];
}

export interface ObjectiveDTO {
    id: number;
    label: string;
    text: string;
    favorite: boolean;
    balanceType: string;
    image_url: string;
    deadLine: string;
    completed: boolean;
    goalsLabel: string;
}

export interface ObjectiveGoalDTO {
    id: number;
    text: string;
    completed: boolean;
    deadLine: string;
    createdAt: string;
}

export interface ObjectiveRequest {
    label: string;
    text: string;
    file: File | null | undefined;
    favorite: boolean;
    balanceType: string;
    deadLine: string;
    completed: boolean;
    goalsLabel: string;
}

export interface ObjectiveGoalRequest {
    text: string;
    completed: boolean;
    deadLine: string;
}

export async function addObjective(data: ObjectiveRequest): Promise<number> {
   return (await API.post(`objectives`, data)).data.id;
}

export type UploadResult = "replaced" | "deleted" | "no_action";

export async function modifyObjective(id: number, replaceFile: boolean, data: ObjectiveRequest): Promise<{ result: UploadResult, url: string | null }> {
    await API.put(`objectives/${ id }`, data);

    if (replaceFile && data.file != null) {
        return { result: "replaced", url: await uploadFile(id, data.file) };
    }
    else if (replaceFile) {
        await deleteFile(id);
        return { result: "deleted", url: null };
    }

    return { result: "no_action", url: null };
}

export async function removeObjective(id: number) {
    await API.delete(`objectives/${ id }`);
}

export async function getAllObjectives(): Promise<ObjectiveData[]> {
    const data: ObjectiveDTO[] = (await API.get("objectives")).data.data ?? [];

    return data.map(dto => ({
        id: dto.id,
        label: dto.label,
        text: dto.text,
        favorite: dto.favorite,
        balanceType: BalanceTypes[dto.balanceType],
        deadLine: new Date(dto.deadLine),
        image_url: dto.image_url == "" ? null : dto.image_url,
        completed: dto.completed,
        goalsLabel: dto.goalsLabel,
        goals: []
    }));
}

export async function addObjectiveGoal(objective_id: number, data: ObjectiveGoalRequest): Promise<number> {
    return (await API.post(`objectives/goals/${ objective_id }`, data)).data.id;
}

export async function modifyObjectiveGoal(objective_id: number, goal_id: number, data: ObjectiveGoalRequest) {
    await API.put(`objectives/goals/${ objective_id }/${ goal_id }`, data);
}

export async function removeObjectiveGoal(objective_id: number, goal_id: number) {
    return API.delete(`objectives/goals/${ objective_id }/${ goal_id }`);
}

export async function getObjectiveGoals(objective_id: number): Promise<ObjectiveGoalData[]> {
    const data: ObjectiveGoalDTO[] = (await API.get(`objectives/goals/${ objective_id }`)).data.data ?? [];

    return data.map(dto => ({
        id: dto.id,
        text: dto.text,
        completed: dto.completed,
        deadLine: new Date(dto.deadLine),
        createdAt: new Date(dto.createdAt),
        favorite: false
    }));
}

export async function modifyMission(data: string) {
    await API.put("mission", { text: data });
}

export async function getMission(): Promise<string> {
    return (await API.get("mission")).data.data.text ?? "";
}

export async function uploadFile(id: number, file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    return (await API.post(`objectives/goals/upload/${ id }`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })).data ?? null;
}

export async function deleteFile(id: number) {
    await API.delete(`objectives/goals/upload/${ id }`);
}