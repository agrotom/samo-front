import type { GoalData, GoalDataDTO, GoalDataRequest } from "@/api/goals";
import { API } from "./auth";

export interface ListData {
    id: number;
    header: string;
    goals: GoalData[];
    createdAt: Date;
}

export interface ListDataRequest {
    header: string;
}

export interface ListDataDTO {
    id: number;
    header: string;
    createdAt: string;
}

export async function addList(request: ListDataRequest): Promise<number> {
    return (await API.post("lists", request)).data.id;
}

export async function modifyList(id: number, request: ListDataRequest) {
    await API.put(`lists/${ id }`, request)
}

export async function removeList(id: number) {
    await API.delete(`lists/${ id }`);
}

export async function getLists(): Promise<ListData[]> {
    const lists: ListDataDTO[] = (await API.get("lists")).data.data ?? [];

    return lists.map(dto => ({ id: dto.id, header: dto.header, goals: [], createdAt: new Date(dto.createdAt) }));
}

export async function addListGoal(id: number, request: GoalDataRequest): Promise<number> {
    return (await API.post(`lists/goals/${ id }`, request)).data.id;
}

export async function modifyListGoal(id: number, request: GoalDataRequest) {
    await API.put(`lists/goals/${id}`, request);
}

export async function removeListGoal(id: number) {
    await API.delete(`lists/goals/${ id }`);
}

export async function getListGoals(listId: number): Promise<GoalData[]> {
    const goals: GoalDataDTO[] = (await API.get(`lists/goals/${ listId }`)).data.data ?? [];

    return goals.map(dto => ({ id: dto.id, text: dto.text, favorite: dto.favorite, completed: dto.completed, createdAt: new Date(dto.createdAt) }));
}