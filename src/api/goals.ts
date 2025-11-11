import type UniqueObject from "@/util/uniqueObject";

export interface GoalData extends UniqueObject {
    id: number;
    completed: boolean;
    text: string;
}

const goalsData: GoalData[] = [
    {
        id: 0,
        completed: true,
        text: 'Сходить на кружок'
    },
    {
        id: 1,
        completed: false,
        text: 'Посмотреть фильм'
    },
    {
        id: 1,
        completed: false,
        text: 'Посмотреть фильм'
    },
    {
        id: 1,
        completed: false,
        text: 'Посмотреть фильм'
    },
    {
        id: 1,
        completed: false,
        text: 'Посмотреть фильм'
    },
    {
        id: 1,
        completed: false,
        text: 'Посмотреть фильм'
    },
    {
        id: 1,
        completed: false,
        text: 'Посмотреть фильм'
    },
    {
        id: 1,
        completed: false,
        text: 'Посмотреть фильм'
    },
    {
        id: 1,
        completed: false,
        text: 'Посмотреть фильм'
    },
    {
        id: 1,
        completed: false,
        text: 'Посмотреть фильм'
    },
    {
        id: 1,
        completed: false,
        text: 'Посмотреть фильм'
    },
    {
        id: 1,
        completed: false,
        text: 'Посмотреть фильм'
    },
    {
        id: 1,
        completed: false,
        text: 'Посмотреть фильм'
    },
    {
        id: 1,
        completed: false,
        text: 'Посмотреть фильм'
    },
    {
        id: 2,
        completed: false,
        text: 'Узнать что происходит'
    }
];

export function getGoals() {
    return goalsData;
}