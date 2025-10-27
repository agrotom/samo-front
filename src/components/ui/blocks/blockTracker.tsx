import { useEffect, useState } from 'react';
import { ControllableHeader } from "@/components/ui/elements/text-header";
import { getTrackers, setTrackers, type TrackerData } from '@/api/trackers';
import Tracker from '@/components/ui/elements/tracker';
import tracker_image from '@/assets/tracker_image.svg'

export default function BlockTracker() {
    const [editable, setEditable] = useState<boolean>(false);
    const [trackersData, setTrackersData] = useState<TrackerData[]>(getTrackers());

    const reserveTrackerID = () => {
        var sorted = trackersData.sort((a, b) => a.id - b.id);
        if (sorted.length > 0) {
            return sorted[sorted.length - 1].id + 1;
        }

        return 0;
    }

    useEffect(() => {
        setTrackers(trackersData);
    }, [trackersData]);

    return (
        <div className='flex flex-col h-full'>
            <ControllableHeader text="Ежедневный трекер привычек" editable={editable} setEditable={setEditable} onAdd={ () => setTrackersData([...trackersData, { id: reserveTrackerID(), name: 'Без названия', totalSteps: 4, currentStep: 1 }]) } />
            <div className='flex flex-row mt-2 min-h-0 h-full'>
                <div className='flex flex-col pt-5 w-full min-h-0 overflow-y-auto pr-5 md:h-[196px] space-y-5 md:space-y-0'>
                    {
                        trackersData.map(data => {
                            return <Tracker key={`tracker-${data.id}`} label={data.name} totalSteps={data.totalSteps} step={data.currentStep} onChange={
                                e => { data.name = e.name; data.totalSteps = e.totalSteps; data.currentStep = e.currentStep; setTrackers(trackersData); } } editable={editable}></Tracker>;
                        })
                    }
                </div>
                <img className={`mx-[5%] hidden lg:block`} src={tracker_image}/>
            </div>
        </div>                   
    )
}