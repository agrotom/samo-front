import { getAllObjectives, getMission, type ObjectiveData, type ObjectiveGoalData } from '@/api/objective'
import { LifeBrightness, type Balance } from '@/util/balanceWheel';
import { reserveID } from '@/util/uniqueObject';
import { create } from 'zustand'

export interface RawObjectiveData {
    imageFile?: File;
    label: string;
    text: string;
    favorite: boolean;
    balanceType: Balance;
    date: Date;
    completed: boolean;
    goalsLabel: string;
    goals: ObjectiveGoalData[];
}

export interface ObjectivesControllerState {
    objectives: ObjectiveData[];
    selectedObjective: ObjectiveData;
    mission: string;
    setMission: (data: string) => void;
    selectObjective: (data: ObjectiveData) => void;
    addEmptyObjective: (monthOffset: number) => void;
    addObjective: (newData: RawObjectiveData) => void;
    addEmptyObjectiveGoal: (id: number) => void;
    modifyObjective: (id: number, newData: RawObjectiveData) => void;
    removeObjective: (id: number) => void;
    isAllowedFavorite: () => boolean;
    getFavorites: () => ObjectiveData[];
}

const reserveObjectiveID = (state: ObjectivesControllerState) => {
    var sorted = [...state.objectives].sort((a, b) => a.id - b.id);

    if (sorted.length > 0) {
        return sorted[sorted.length - 1].id + 1;
    }

    return -1;
}

const createEmptyObjectiveData = (): ObjectiveData => {
    return (
        {
            id: 0,
            label: 'Без названия',
            text: '',
            favorite: false,
            balanceType: LifeBrightness,
            date: new Date(),
            completed: false,
            image_url: undefined,
            goalsLabel: "Без названия",
            goals: []
        }   
    )
}

const useObjectivesController = create<ObjectivesControllerState>((set, get) => ({
    objectives: getAllObjectives(),
    selectedObjective: createEmptyObjectiveData(),
    mission: getMission().slice(0, 100),
    
    setMission: data => set(state => ({
        ...state,
        mission: data
    })),
    selectObjective: data => set(state => {
        return { ...state, selectedObjective: { ...data } };
    }),
    addEmptyObjective: monthOffset => {
        var emptyData = createEmptyObjectiveData();
        emptyData.date.setMonth(emptyData.date.getMonth() + monthOffset);
        get().addObjective(emptyData);
    },
    addEmptyObjectiveGoal: id => set(state => ({
        ...state,
        objectives: state.objectives.map(oldData => oldData.id == id ?
            {
                ...oldData, goals: [ ...oldData.goals, { id: reserveID(oldData.goals), text: "Без названия", completed: false, deadLine: new Date() } ]
            } : oldData)
    })),
    addObjective: newData => set((state) => {

         return {
            ...state,
            objectives: [
                ...state.objectives,
                {
                    balanceType: newData.balanceType,
                    completed: newData.completed,
                    date: newData.date,
                    favorite: newData.favorite,
                    goals: newData.goals,
                    image_url: "", // TODO
                    label: newData.label,
                    text: newData.text,
                    goalsLabel: newData.goalsLabel,
                    id: reserveObjectiveID(state)
                }
            ]
         };
    }),
    modifyObjective: (id, newData) => set((state) => {
        var data = state.objectives.find(data => data.id == id);

        if (data === undefined) {
            return state;
        }

        return {
            ...state,
            selectedObjective: state.selectedObjective.id == id
            ? { ...state.selectedObjective, ...newData, image_url: "" }
            : state.selectedObjective,
            objectives: state.objectives.map(objective => {
                return objective.id == id ?
                {
                    ...objective,
                    balanceType: newData.balanceType,
                    completed: newData.completed,
                    date: newData.date,
                    favorite: newData.favorite,
                    goals: newData.goals,
                    image_url: "", // TODO
                    label: newData.label,
                    text: newData.text,
                    goalsLabel: newData.goalsLabel
                } : objective
            })
        };
    }),
    removeObjective: id => set((state) => {
        console.log(id)
        return { ...state, objectives: state.objectives.filter(data => data.id != id) };
    }),
    isAllowedFavorite: () => get().objectives.filter(objective => objective.favorite).length < 3,
    getFavorites: () => get().objectives.filter(objective => objective.favorite)
}))

export default useObjectivesController;