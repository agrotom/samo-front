import { getUser } from "./auth";
import type { TrackerData } from "./trackers";

export const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et tincidunt nulla. Vivamus sed mi vitae ante tempor mattis non sit amet orci. Quisque id justo tortor. Donec vel diam dignissim, cursus ligula quis, fermentum sapien. Etiam a imperdiet eros, vel aliquam elit. Pellentesque gravida dignissim lorem varius ullamcorper. Sed congue pharetra velit ac tincidunt. Nullam ornare, ligula ac sollicitudin faucibus, risus mi hendrerit sapien, et tristique leo purus et arcu. Quisque ornare at neque ut cursus. Curabitur sit amet ipsum sed metus imperdiet ultrices eget eget ante. Aenean vitae lectus tellus.";

export interface RiteData {
    completed: boolean;
    text: string;
    sort_order: number;
}

export interface TodayDeeds {
    level: number;
    text: string;
}

export interface WeekHabit {
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
        name: "Насколько я доволен работой",
        currentStep: 5,
        totalSteps: 11
    };
}

export function getSelfHappines(): TrackerData {
    return {
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
            level: 0,
            text: '1. Подпись документов'
        },
        {
            level: 1,
            text: '2. Встреча с инвесторами'
        },
        {
            level: 2,
            text: '3. Свидание с Машей'
        },
        {
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
            checks: [false, true, false, false, true, false, true],
            text: "Начать вставать в 6 часов утра"
        },
        {
            checks: [false, true, false, true, true, true, true],
            text: "Бросить курить"
        },
        {
            checks: [false, true, false, false, false, false, false],
            text: "Читать каждый день минимум час"
        }
    ];
}

export function saveRites(date: Date, rites: RiteData[]) {
    console.log(`Saving rites ${ rites.map<string>(rite => rite.text + `: ${rite.completed}`) } to ${date} by user ${getUser()}`);
}

export function saveFocus(date: Date, focus: string) {
    console.log(`Saving focus ${ focus } to ${date} by user ${getUser()}`);
}

export function saveThanks(date: Date, thanks: string) {
    console.log(`Saving focus ${ thanks } to ${date} by user ${getUser()}`);
}

export function saveInsight(date: Date, insight: string) {
    console.log(`Saving focus ${ insight } to ${date} by user ${getUser()}`);
}

export function saveProblems(date: Date, problems: string) {
    console.log(`Saving focus ${ problems } to ${date} by user ${getUser()}`);
}

export function saveResults(date: Date, results: string) {
    console.log(`Saving focus ${ results } to ${date} by user ${getUser()}`);
}

export function saveTodayDeeds(todayDeeds: TodayDeeds[]) {
    console.log(`Saving today deeds: ${todayDeeds.map(deed => `{ level: ${ deed.level }, text: ${ deed.text } }, `) } to ${new Date()} by user ${getUser()}`);
}

export function saveTomorrowMainTasks(tasks: string) {
    console.log(`Saving focus ${ tasks } to ${new Date()} by user ${getUser()}`);
}