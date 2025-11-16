import type UniqueObject from "@/util/uniqueObject";
import { API } from "./auth";
import type { TrackerData } from "./trackers";

export const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et tincidunt nulla. Vivamus sed mi vitae ante tempor mattis non sit amet orci. Quisque id justo tortor. Donec vel diam dignissim, cursus ligula quis, fermentum sapien. Etiam a imperdiet eros, vel aliquam elit. Pellentesque gravida dignissim lorem varius ullamcorper. Sed congue pharetra velit ac tincidunt. Nullam ornare, ligula ac sollicitudin faucibus, risus mi hendrerit sapien, et tristique leo purus et arcu. Quisque ornare at neque ut cursus. Curabitur sit amet ipsum sed metus imperdiet ultrices eget eget ante. Aenean vitae lectus tellus.";

export interface RiteData extends UniqueObject {
    completed: boolean;
    text: string;
    sort_order: number;
}

export interface TodayDeeds extends UniqueObject {
    level: number;
    text: string;
}

export interface WeekHabit extends UniqueObject {
    checks: boolean[];
    text: string;
}

export interface DiaryData {
    date: Date,
    morning: {
        rites: RiteData[],
        focus: string,
        thanks: string; // Блок "Я благодарю за то, что..."
    },
    evening: {
        insight: string,
        problems: string,
        results: string,
        todayDeeds: TodayDeeds[],
        tomorrowMainTasks: string,
        workHappiness: number,
        selfHappiness: number,
        weekHabits: WeekHabit[];
    };
}

export function getWorkHappines(): number {
    return 1;
}

export function getSelfHappines(): number {
    return 1;
}

export function getRites(): RiteData[] {
    return [];
}

export function getTodayDeeds(): TodayDeeds[] {
    return [];
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

export async function getTextEntity(type: string): Promise<string> {
    var response = await API.get(`${DIARY_URL}${type}`);

    if (response.status != 200) {
        throw new Error(`Not able to fetch ${type} data!`);
    }

    return response.data;
}

export function getWeekHabits(): WeekHabit[] {
    return [
        {
            id: 0,
            checks: [false, true, false, false, true, false, true],
            text: "Без названия"
        },
        {
            id: 1,
            checks: [false, true, false, true, true, true, true],
            text: "Без названия"
        },
        {
            id: 2,
            checks: [false, true, false, false, false, false, false],
            text: "Без названия"
        }
    ];
}

export function saveRites(rites: RiteData[]) {
    console.log(`Saving rites ${ rites.map<string>(rite => rite.text + `: ${rite.completed}`) } to ${ new Date() } by user `);
}

export function saveFocus(focus: string) {
    console.log(`Saving focus ${ focus } to ${ new Date() } by user `);
}

export function saveThanks(thanks: string) {
    console.log(`Saving focus ${ thanks } to ${ new Date() } by user `);
}

export function saveInsight(insight: string) {
    console.log(`Saving focus ${ insight } to ${ new Date() } by user`);
}

export function saveProblems(problems: string) {
    console.log(`Saving focus ${ problems } to ${ new Date() } by user `);
}

export function saveResults(results: string) {
    console.log(`Saving focus ${ results } to ${ new Date() } by user `);
}

export function saveTodayDeeds(todayDeeds: TodayDeeds[]) {
    console.log(`Saving today deeds: ${todayDeeds.map(deed => `{ level: ${ deed.level }, text: ${ deed.text } }, `) } to ${new Date()} by user `);
}

export function saveTomorrowMainTasks(tasks: string) {
    console.log(`Saving focus ${ tasks } to ${new Date()} by user `);
}

export function saveWeekHabits(data: WeekHabit[]) {
    console.log(`Saving habits ${ data.map(weekHabit => weekHabit.checks) } to ${ new Date() } by user `);
}

export function setWorkHappiness(data: TrackerData) {
    console.log(`Saving work happiness ${ data.currentStep } to ${ new Date() } by user `);
}

export function setSelfHappiness(data: TrackerData) {
    console.log(`Saving self happiness ${ data.currentStep } to ${ new Date() } by user `);
}