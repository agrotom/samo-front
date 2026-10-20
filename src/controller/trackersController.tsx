import { addTracker, getTrackers, modifyTracker, removeTracker, type TrackerData } from "@/api/trackers";
import { create } from "zustand";
import useGlobalController from "@/controller/globalController"

interface TrackersController {
    trackers: TrackerData[];
    addEmptyTracker: () => Promise<void>;
    modifyTracker: (id: number, data: TrackerData) => void;
    removeTracker: (id: number) => void;
    fetchData: (date: Date) => Promise<void>;
}

const createEmptyTracker = (): TrackerData => {
    return (
        {
            id: 0,
            name: "Без названия",
            currentStep: 1,
            totalSteps: 2,
            createdAt: new Date()
        }
    );
}

const useTrackersController = create<TrackersController>((set) => ({
    trackers: [],
    addEmptyTracker: async () => {
        const data: TrackerData = createEmptyTracker();
        data.id = await addTracker({
            name: data.name,
            currentStep: data.currentStep,
            totalSteps: data.totalSteps
        });

        set(state => {
            return ({
                ...state,
                trackers: [ ...state.trackers, data ]
            });
        });
    },
    modifyTracker: (id, data) => {
        set(state => {
            if (!useGlobalController.getState().isModifyingAllowed) return state;

            modifyTracker(id, data);
            
            return ({
                ...state,
                trackers: state.trackers.map(oldData => {
                    return oldData.id == id ? { ...data } : oldData
                })
            });
        });
    },
    removeTracker: id => {
        set(state => {
            if (!useGlobalController.getState().isModifyingAllowed) return state;

            removeTracker(id);

            return ({
                ...state,
                trackers: state.trackers.filter(data => data.id != id)
            });
        });
    },
    fetchData: async (date: Date) => {
        const trackersData = await getTrackers(date);

        set({
            trackers: trackersData
        });
    }
}));

export default useTrackersController;