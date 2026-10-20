import { addObjective, addObjectiveGoal, getAllObjectives, getMission, getObjectiveGoals, modifyMission, modifyObjective, modifyObjectiveGoal, removeObjective, removeObjectiveGoal, type ObjectiveData, type ObjectiveGoalData } from '@/api/objective'
import { LifeBrightness, type Balance } from '@/common/balanceWheel';
import { create } from 'zustand'

export interface RawObjectiveData {
    imageFile: File | null | undefined;
    label: string;
    text: string;
    favorite: boolean;
    balanceType: Balance;
    deadLine: Date;
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
    addEmptyObjective: (monthOffset: number) => Promise<void>;
    addEmptyObjectiveGoal: (id: number) => Promise<void>;
    modifyObjectiveGoal: (objectiveId: number, goalId: number, data: ObjectiveGoalData) => void;
    removeObjectiveGoal: (objectiveId: number, goalId: number) => void;
    modifyObjective: (id: number, replaceFile: boolean, newData: RawObjectiveData) => void;
    removeObjective: (id: number) => void;
    isAllowedFavorite: () => boolean;
    getFavorites: () => ObjectiveData[];
    fetchData: () => Promise<void>;
}

const createEmptyObjectiveData = (): ObjectiveData => {

    return (
        {
            id: 0,
            label: 'Без названия',
            text: '',
            favorite: false,
            balanceType: LifeBrightness,
            deadLine: new Date(),
            completed: false,
            image_url: null,
            goalsLabel: 'Без названия',
            goals: []
        }   
    )
}

const useObjectivesController = create<ObjectivesControllerState>((set, get) => ({
    objectives: [],
    selectedObjective: createEmptyObjectiveData(),
    mission: "",
    
    setMission: data => set(state => {
        modifyMission(data);
        
        return({
            ...state,
            mission: data
        });
    }),
    selectObjective: data => set(state => {
        return { ...state, selectedObjective: { ...data } };
    }),
    addEmptyObjectiveGoal: async id => {
        var deadLine = new Date();

        deadLine.setMonth(deadLine.getMonth() + 1);

        const newGoal: ObjectiveGoalData = {
            id: 0,
            text: 'Без названия',
            completed: false,
            deadLine: deadLine,
            favorite: false,
            createdAt: new Date()
        };

        newGoal.id = await addObjectiveGoal(id, {
            text: newGoal.text,
            completed: newGoal.completed,
            deadLine: newGoal.deadLine.toISOString()
        });

        set(state => {
            const newObjectives = state.objectives.map(oldData => oldData.id == id ?
                {
                    ...oldData, goals: [ ...oldData.goals, newGoal ]
                } : oldData);

            return { selectedObjective: id == state.selectedObjective.id ? newObjectives.find(data => data.id == id) : state.selectedObjective, objectives: newObjectives }
        })
    },
    modifyObjectiveGoal: (objectiveId, goalId, data) => set(state => {
        modifyObjectiveGoal(objectiveId, goalId, {
            text: data.text,
            completed: data.completed,
            deadLine: data.deadLine.toISOString()
        });

        const newObjectives = state.objectives.map(oldData => oldData.id == objectiveId ?
            {
                ...oldData,
                goals: oldData.goals.map(oldGoalData => oldGoalData.id == goalId ? {
                    ...oldGoalData,
                    text: data.text,
                    completed: data.completed,
                    deadLine: data.deadLine
                } : oldGoalData)
            } : oldData
        );

        return { selectedObjective: objectiveId == state.selectedObjective.id ? newObjectives.find(data => data.id == objectiveId) : state.selectedObjective, objectives: newObjectives }
    }),
    removeObjectiveGoal: (objectiveId, goalId) => set(state => {
        removeObjectiveGoal(objectiveId, goalId);

        const newObjectives = state.objectives.map(oldData => oldData.id == objectiveId ?
            {
                ...oldData,
                goals: oldData.goals.filter(data => data.id != goalId)
            } : oldData
        );

        return { selectedObjective: objectiveId == state.selectedObjective.id ? newObjectives.find(data => data.id == objectiveId) : state.selectedObjective, objectives: newObjectives };
    }),
    addEmptyObjective: async monthOffset => {
        const objective: ObjectiveData = createEmptyObjectiveData();

        objective.deadLine.setMonth(objective.deadLine.getMonth() + monthOffset);

        objective.id = await addObjective({ 
            label: objective.label,
            text: objective.text,
            file: null,
            favorite: objective.favorite,
            balanceType: objective.balanceType.id,
            deadLine: objective.deadLine.toISOString(),
            completed: objective.completed,
            goalsLabel: objective.goalsLabel
        });

        set(state => ({
            ...state,
            objectives: [
                ...state.objectives,
                objective
            ]
        }));
    },
    modifyObjective: (id, replaceFile, newData) => {
        var data = get().objectives.find(data => data.id == id);

        if (data === undefined) {
            return;
        }

        (async () => {
            var image_url = await modifyObjective(id, replaceFile, {
                label: newData.label,
                text: newData.text,
                file: newData.imageFile,
                favorite: newData.favorite,
                balanceType: newData.balanceType.id,
                deadLine: newData.deadLine.toISOString(),
                completed: newData.completed,
                goalsLabel: newData.goalsLabel
            });

            set((state) => ({
                ...state,
                selectedObjective: state.selectedObjective.id == id
                ? { ...state.selectedObjective, ...newData, image_url: image_url.result == "no_action" ? state.selectedObjective.image_url : null  }
                : state.selectedObjective,
                objectives: state.objectives.map(objective => {
                    return objective.id == id ?
                    {
                        ...objective,
                        balanceType: newData.balanceType,
                        completed: newData.completed,
                        deadLine: newData.deadLine,
                        favorite: newData.favorite,
                        goals: newData.goals,
                        label: newData.label,
                        image_url: image_url.result == "no_action" ? state.selectedObjective.image_url : null,
                        text: newData.text,
                        goalsLabel: newData.goalsLabel
                    } : objective
                })}))
        })();
    },
    removeObjective: id => set((state) => {
        removeObjective(id);

        return { ...state, objectives: state.objectives.filter(data => data.id != id) };
    }),
    isAllowedFavorite: () => get().objectives.filter(objective => objective.favorite).length < 3,
    getFavorites: () => get().objectives.filter(objective => objective.favorite),
    fetchData: async () => {
        const objectives = await getAllObjectives();
        const mission = await getMission();

        const objectivesWithGoals = await Promise.all(
                    objectives.map(async obj => {
                        const goals = await getObjectiveGoals(obj.id);
                        return { ...obj, goals };
                    })
                );

        set({
            objectives: objectivesWithGoals,
            mission: mission.slice(0, 100)
        });
    }
}))

export default useObjectivesController;