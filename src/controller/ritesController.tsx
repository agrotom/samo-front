import { getRites, type RiteData } from "@/api/diary";
import { reserveID } from "@/util/uniqueObject";
import { create } from "zustand";

interface RitesControllerState {
    rites: RiteData[],
    modifyRite: (id: number, data: RiteData) => void;
    removeRite: (id: number) => void;
    setRites: (data: RiteData[]) => void;
    addEmptyRite: () => void;
}

const useRitesController = create<RitesControllerState>((set) => ({
    rites: getRites(),
    modifyRite: (id, data) => set(state => ({
        ...state,
        rites: state.rites.map(oldData => {
            return oldData.id == id ? {
                ...data
            } : oldData;
        })
    })),
    removeRite: id => set(state => ({
        ...state,
        rites: state.rites.filter(data => data.id != id)
    })),
    setRites: (data) => set(state => ({
        ...state,
        rites: data
    })),
    addEmptyRite: () => set(state => ({
        ...state,
        rites: [ ...state.rites, { id: reserveID(state.rites), completed: false, text: "Без названия", sort_order: Math.max(...state.rites.map(rite => rite.sort_order)) + 1 } ]
    }))
}));

export default useRitesController;