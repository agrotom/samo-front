import { getUser } from "./auth";
import type { TrackerData } from "./trackers";

export const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et tincidunt nulla. Vivamus sed mi vitae ante tempor mattis non sit amet orci. Quisque id justo tortor. Donec vel diam dignissim, cursus ligula quis, fermentum sapien. Etiam a imperdiet eros, vel aliquam elit. Pellentesque gravida dignissim lorem varius ullamcorper. Sed congue pharetra velit ac tincidunt. Nullam ornare, ligula ac sollicitudin faucibus, risus mi hendrerit sapien, et tristique leo purus et arcu. Quisque ornare at neque ut cursus. Curabitur sit amet ipsum sed metus imperdiet ultrices eget eget ante. Aenean vitae lectus tellus.";

export interface RiteData {
    completed: boolean;
    text: string;
    sort_order: number;
}

export interface TodayDeeds {
    id: number;
    level: number;
    text: string;
}

export interface WeekHabit {
    id: number;
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

export function getWorkHappines(): TrackerData {
    return {
        id: 0,
        name: "Насколько я доволен работой",
        currentStep: 5,
        totalSteps: 11
    };
}

export function getSelfHappines(): TrackerData {
    return {
        id: 0,
        name: "Насколько я счастлив",
        currentStep: 7,
        totalSteps: 11
    };
}

export function getRites(): RiteData[] {

    var rites: RiteData[] = [];

    for (let i = 0; i < 11; i++) {
        rites.push({ completed: false, text: i.toString(), sort_order: i });
    }

    return rites;
}

export function getTodayDeeds(): TodayDeeds[] {
    return [
        {
            id: 0,
            level: 0,
            text: '1. Подпись документов'
        },
        {
            id: 1,
            level: 1,
            text: '2. Встреча с инвесторами'
        },
        {
            id: 2,
            level: 2,
            text: '3. Свидание с Машей'
        },
        {
            id: 3,
            level: 3,
            text: 'CRAFT'
        }
    ];
}

export function getFocus(): string {
    return LOREM;
}

export function getThanks(): string {
    return LOREM;
}

export function getInsight(): string {
    return "Нужно прожить день, проанализировать и сделать лучше.\nЭто значит быть осознанным.";
}

export function getProblems(): string {
    return "1. Можно было больше времени посвятить семье и сходить погулять в парк\n2.Можно было сделать больший акцент на качество, а не количество";
}

export function getResults(): string {
    return "1. Закрыл крупную сделку\n2. Получил новую работу.";
}

export function getTomorrowMainTasks(): string {
    return "1. Организовать выставку\n2. 20 продаж за день\n3. Провести обучение персонала";
}

export function getWeekHabits(): WeekHabit[] {
    return [
        {
            id: 0,
            checks: [false, true, false, false, true, false, true],
            text: "Начать вставать в 6 часов утра"
        },
        {
            id: 1,
            checks: [false, true, false, true, true, true, true],
            text: "Бросить курить"
        },
        {
            id: 2,
            checks: [false, true, false, false, false, false, false],
            text: "Читать каждый день минимум час"
        }
    ];
}

export function saveRites(rites: RiteData[]) {
    console.log(`Saving rites ${ rites.map<string>(rite => rite.text + `: ${rite.completed}`) } to ${ new Date() } by user ${getUser()}`);
}

export function saveFocus(focus: string) {
    console.log(`Saving focus ${ focus } to ${ new Date() } by user ${getUser()}`);
}

export function saveThanks(thanks: string) {
    console.log(`Saving focus ${ thanks } to ${ new Date() } by user ${getUser()}`);
}

export function saveInsight(insight: string) {
    console.log(`Saving focus ${ insight } to ${ new Date() } by user ${getUser()}`);
}

export function saveProblems(problems: string) {
    console.log(`Saving focus ${ problems } to ${ new Date() } by user ${getUser()}`);
}

export function saveResults(results: string) {
    console.log(`Saving focus ${ results } to ${ new Date() } by user ${getUser()}`);
}

export function saveTodayDeeds(todayDeeds: TodayDeeds[]) {
    console.log(`Saving today deeds: ${todayDeeds.map(deed => `{ level: ${ deed.level }, text: ${ deed.text } }, `) } to ${new Date()} by user ${getUser()}`);
}

export function saveTomorrowMainTasks(tasks: string) {
    console.log(`Saving focus ${ tasks } to ${new Date()} by user ${getUser()}`);
}

export function saveWeekHabits(data: WeekHabit[]) {
    console.log(`Saving habits ${ data.map(weekHabit => weekHabit.checks) } to ${ new Date() } by user ${getUser()}`);
}

export function setWorkHappiness(data: TrackerData) {
    console.log(`Saving work happiness ${ data.currentStep } to ${ new Date() } by user ${getUser()}`);
}

export function setSelfHappiness(data: TrackerData) {
    console.log(`Saving self happiness ${ data.currentStep } to ${ new Date() } by user ${getUser()}`);
}