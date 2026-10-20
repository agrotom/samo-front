import { useState } from 'react';
import { ControllableHeader } from "@/components/atoms/text-header";
import Tracker from '@/components/molecules/tracker';
import useTrackersController from '@/controller/trackersController';
import { TrackerImage } from '../atoms/Sprite';

export default function BlockTracker() {
    const [editable, setEditable] = useState<boolean>(false);
    const trackersData = useTrackersController(state => state.trackers);
    const modifyTracker = useTrackersController(state => state.modifyTracker);
    const addEmptyTracker = useTrackersController(state => state.addEmptyTracker);
    const removeTracker = useTrackersController(state => state.removeTracker);

    return (
        <div className='flex flex-col h-full w-full'>
            <ControllableHeader text="daily_habits_header" editable={editable} setEditable={setEditable} onAdd={ addEmptyTracker } />
            <div className='flex flex-row mt-2 min-h-0 h-full'>
                <div className='flex flex-col pt-5 min-h-0 overflow-y-auto pr-5 space-y-5 md:space-y-0 w-full'>
                    {
                        trackersData.map(data => {
                            return <Tracker key={`tracker-${data.id}`} label={data.name} totalSteps={data.totalSteps} step={data.currentStep} onDelete={ () => removeTracker(data.id) } onChange={
                                e => modifyTracker(data.id, { id: data.id, name: e.name, currentStep: e.currentStep, totalSteps: e.totalSteps, createdAt: data.createdAt }) } editable={editable}></Tracker>;
                        })
                    }
                </div>
                <TrackerImage className={`mx-[5%] my-auto shrink-0 size-48 hidden lg:block`} />
            </div>
        </div>                   
    )
}