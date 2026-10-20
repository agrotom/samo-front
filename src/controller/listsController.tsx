import type { GoalData } from '@/api/goals';
import { addList, addListGoal, getListGoals, getLists, modifyList, modifyListGoal, removeList, removeListGoal, type ListData } from '@/api/lists';
import { create } from 'zustand'

export interface ListsControllerState {
    lists: ListData[];
    favoriteGoals: GoalData[];
    addEmptyList: () => Promise<void>;
    addEmptyListGoal: (listId: number) => Promise<void>;
    modifyListGoal: (listId: number, goalId: number, data: GoalData) => void;
    removeListGoal: (listId: number, goalId: number) => void;
    modifyList: (id: number, newData: ListData) => void;
    removeList: (id: number) => void;
    getFavorites: () => GoalData[];
    fetchData: () => Promise<void>;
}

const createEmptyListData = (): ListData => {

    return (
        {
            id: 0,
            header: "Без названия",
            goals: [],
            createdAt: new Date()
        }   
    )
}

const useListsController = create<ListsControllerState>((set, get) => ({
    lists: [],
    favoriteGoals: [],
    addEmptyListGoal: async id => {
        const newGoal = {
            id: 0,
            text: 'Без названия',
            completed: false,
            favorite: false,
            createdAt: new Date()
        };

        newGoal.id = await addListGoal(id, {
            text: newGoal.text,
            completed: newGoal.completed,
            favorite: newGoal.favorite
        });

        set(state => {
            const newLists = state.lists.map(oldData => oldData.id == id ?
                {
                    ...oldData, goals: [ ...oldData.goals, newGoal ]
                } : oldData);

            return { ...state, lists: newLists }
        })
    },
    modifyListGoal: (listId, goalId, data) => set(state => {

        modifyListGoal(goalId, {
            text: data.text,
            completed: data.completed,
            favorite: data.favorite
        });

        const newLists = state.lists.map(oldData => oldData.id == listId ?
            {
                ...oldData,
                goals: oldData.goals.map(oldGoalData => oldGoalData.id == goalId ? {
                    ...oldGoalData,
                    text: data.text,
                    completed: data.completed,
                    favorite: data.favorite
                } : oldGoalData)
            } : oldData
        );

        return { ...state, lists: newLists }
    }),
    removeListGoal: (listId, goalId) => set(state => {
        removeListGoal(goalId);

        const newLists = state.lists.map(oldData => oldData.id == listId ?
            {
                ...oldData,
                goals: oldData.goals.filter(data => data.id != goalId)
            } : oldData
        );

        return { ...state, lists: newLists };
    }),
    addEmptyList: async () => {
        const list: ListData = createEmptyListData();

        list.id = await addList({ 
            header: list.header
        });

        set(state => ({
            ...state,
            lists: [
                ...state.lists,
                list
            ]
        }));
    },
    modifyList: (id, data) => set(state => {
        modifyList(id, {
            header: data.header
        });

        const newLists = state.lists.map(oldData => oldData.id == id ?
            {
                ...oldData,
                header: data.header
            } : oldData
        );

        return { ...state, lists: newLists }
    }),
    removeList: id => set((state) => {
        removeList(id);

        return { ...state, lists: state.lists.filter(data => data.id != id) };
    }),
    getFavorites: () => {
        var state = get();
        var favoriteGoals: GoalData[] = [];

        state.lists.forEach(list => {
            favoriteGoals.push(...list.goals.filter(goal => goal.favorite));
        });

        return favoriteGoals;
    },
    fetchData: async () => {
        const lists: ListData[] = await getLists();

        const listsWithGoals = await Promise.all(
            lists.map(async list => {
                const goals = await getListGoals(list.id);
                return { ...list, goals };
            })
        );

        set({
            lists: listsWithGoals
        });
    }
}))

export default useListsController;