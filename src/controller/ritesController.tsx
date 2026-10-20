import { addRite, getRites, modifyRite, removeRite, type RiteData } from "@/api/diary";
import { create } from "zustand";
import useGlobalController from "@/controller/globalController"

interface RitesControllerState {
    rites: RiteData[],
    modifyRite: (id: number, data: RiteData) => void;
    removeRite: (id: number) => void;
    setRites: (data: RiteData[]) => void;
    addEmptyRite: () => void;
    fetchData: (date: Date) => Promise<void>;
}

const useRitesController = create<RitesControllerState>((set) => ({
    rites: [],
    modifyRite: (id, data) => set(state => {
        if (!useGlobalController.getState().isModifyingAllowed) return state;

        modifyRite(data);
        
        return ({
            ...state,
            rites: state.rites.map(oldData => {
                return oldData.id == id ? {
                    ...data
                } : oldData;
        })});
    }),
    removeRite: id => set(state => {
        if (!useGlobalController.getState().isModifyingAllowed) return state;

        removeRite(id);
        
        return({
            ...state,
            rites: state.rites.filter(data => data.id != id)
        });
    }),
    setRites: (data) => set(state => {
        if (!useGlobalController.getState().isModifyingAllowed) return state;

        data.forEach(d => modifyRite(d));

        return ({
            ...state,
            rites: data
        });
    }),
    addEmptyRite: () => {
        var data = {
            id: 0,
            completed: false,
            text: "Без названия",
            sort_order: 0,
            createdAt: new Date()
        };

        (async () => {
            data.id = await addRite({ completed: data.completed, text: data.text, sort_order: 0 });
            set(state => {
                return({
                    ...state,
                    rites: [ ...state.rites, { ...data, sort_order: Math.max(...state.rites.map(rite => rite.sort_order)) + 1 } ]
                });
            });
        })();
    },
    fetchData: async (date: Date) => {
        const ritesData = await getRites(date);
        
        set({
            rites: ritesData
        });
    } 
}));

export default useRitesController;