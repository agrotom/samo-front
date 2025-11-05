import { getTrackers, type TrackerData } from "@/api/trackers";
import { reserveID } from "@/util/uniqueObject";
import { create } from "zustand";

interface TrackersController {
    trackers: TrackerData[];
    addTracker: (data: TrackerData) => void;
    addEmptyTracker: () => void;
    modifyTracker: (id: number, data: TrackerData) => void;
    removeTracker: (id: number) => void;
}

const createEmptyTracker = (id: number): TrackerData => {
    return (
        {
            id: id,
            name: "Без названия",
            currentStep: 1,
            totalSteps: 2
        }
    );
}

const useTrackersController = create<TrackersController>((set, get) => ({
    trackers: getTrackers(),
    addTracker: data => set(state => ({
        ...state,
        trackers: [ ...state.trackers, { ...data, id: reserveID(state.trackers) } ] // NOT CCOPY TODO
    })),
    addEmptyTracker: () => set(state => (
        {
            ...state,
            trackers: [ ...state.trackers, createEmptyTracker(reserveID(state.trackers)) ]
        }
    )),
    modifyTracker: (id, data) => set(state => ({
        ...state,
        trackers: state.trackers.map(oldData => {
            return oldData.id == id ? { ...data } : oldData
        })
    })),
    removeTracker: id => set(state => ({
        ...state,
        trackers: state.trackers.filter(data => data.id != id)
    }))
}));

export default useTrackersController;