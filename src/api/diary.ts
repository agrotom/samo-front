import type UniqueObject from "@/interfaces/uniqueObject";
import { API } from "./auth";
import { format } from "date-fns";

export const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et tincidunt nulla. Vivamus sed mi vitae ante tempor mattis non sit amet orci. Quisque id justo tortor. Donec vel diam dignissim, cursus ligula quis, fermentum sapien. Etiam a imperdiet eros, vel aliquam elit. Pellentesque gravida dignissim lorem varius ullamcorper. Sed congue pharetra velit ac tincidunt. Nullam ornare, ligula ac sollicitudin faucibus, risus mi hendrerit sapien, et tristique leo purus et arcu. Quisque ornare at neque ut cursus. Curabitur sit amet ipsum sed metus imperdiet ultrices eget eget ante. Aenean vitae lectus tellus.";

export interface RiteData extends UniqueObject {
    completed: boolean;
    text: string;
    sort_order: number;
    createdAt: Date;
}

export interface TodayDeedRequest {
    level: number,
    text: string;
}

export interface TodayDeeds extends UniqueObject {
    level: number;
    text: string;
    createdAt: Date;
}

export interface WeekHabit extends UniqueObject {
    checks: boolean[];
    text: string;
    createdAt: Date;
}

export interface WeekHabitDTO {
    id: number;
    checks: boolean[];
    text: string;
    createdAt: string;
}

export interface WeekHabitRequest {
    checks: boolean[];
    text: string;
}

export interface ToadyDeedDTO {
    id: number;
    level: number;
    text: string;
    createdAt: string;
}

export interface RiteDataRequest {
    completed: boolean;
    text: string;
    sort_order: number;
}

export interface RiteDataDTO {
    id: number;
    completed: boolean;
    text: string;
    sort_order: number;
    createdAt: string;
}

const EMPTY_WEEK_HABIT: WeekHabit = {
    id: 0,
    checks: [false, false, false, false, false, false, false],
    text: "Без названия",
    createdAt: new Date()
};

function toISO(date: Date) {
    return format(date, "yyyy-LL-dd").slice(0, 10);
}

export async function setWorkHappiness(level: number) {
    await API.post(`happiness/work/${level}`);
}

export async function getWorkHappiness(date: Date): Promise<number> {
    return (await API.get("happiness/work?date=" + toISO(date)).then(err => { err.status = 200; return err }).catch(() => ({ data: null}))).data.level ?? 1;
}

export async function setSelfHappiness(level: number) {
    await API.post(`happiness/self/${level}`);
}

export async function getSelfHappiness(date: Date): Promise<number> {
    return (await API.get("happiness/self?date=" + toISO(date))).data.level ?? 1;
}

export async function modifyRite(data: RiteData) {
    await API.put(`rite/${ data.id }`, data);
}

export async function removeRite(id: number) {
    await API.delete(`rite/${ id }`);
}

export async function addRite(data: RiteDataRequest): Promise<number> {
    return (await API.post(`rite`, data)).data.id;
}

export async function getRites(date: Date): Promise<RiteData[]> {
    const rites: RiteDataDTO[] = (await API.get("rite?date=" + toISO(date))).data.data ?? [];

    return rites.map(dto => ({ id: dto.id, text: dto.text, completed: dto.completed, sort_order: dto.sort_order, createdAt: new Date(dto.createdAt) }));
}

export async function addTodayDeed(data: TodayDeedRequest): Promise<number> {
    return (await API.post("todayDeed", data)).data.id;
}

export async function modifyTodayDeed(id: number, data: TodayDeedRequest) {
    await API.put(`todayDeed/${ id }`, data);
}

export async function removeTodayDeed(id: number) {
    await API.delete(`todayDeed/${ id }`);
}

export async function getTodayDeeds(date: Date): Promise<TodayDeeds[]> {
    const todayDeeds: ToadyDeedDTO[] = (await API.get("todayDeed?date=" + toISO(date))).data.data ?? [];
    return todayDeeds.map(dto => ({ id: dto.id, level: dto.level, text: dto.text, createdAt: new Date(dto.createdAt) }));
}

export async function modifyWeekHabit(data: WeekHabit) {
    await API.post(`weekHabit/${ data.id }`, data);
}

export async function getWeekHabits(date: Date): Promise<WeekHabit[]> {
    const weekHabits: WeekHabitDTO[] = (await API.get("weekHabit?date=" + toISO(date))).data.data ?? [];
    
    if (weekHabits.length === 0) {
        return [{ ...EMPTY_WEEK_HABIT, id: -1 }, { ...EMPTY_WEEK_HABIT, id: -2 }, { ...EMPTY_WEEK_HABIT, id: -3 }];
    }

    return weekHabits.map(dto => ({ id: dto.id, text: dto.text, checks: dto.checks, createdAt: new Date(dto.createdAt) }));
}

const DIARY_URL = "diary/";

export const INSIGHTS = "insights";
export const FOCUSES = "focuses";
export const THANKS = "thanks";
export const PROBLEMS = "problems";
export const RESULTS = "results";
export const TOMORROW_MAIN_TASKS = "tomorrowMainTasks";

export async function saveTextEntity(type: string, data: string) {
    await API.put(`${DIARY_URL}${type}`, { text: data });
}

export async function getTextEntity(type: string, date: Date): Promise<string> {
    var response = await API.get(`${DIARY_URL}${type}?date=` + toISO(date));

    return response.data;
}