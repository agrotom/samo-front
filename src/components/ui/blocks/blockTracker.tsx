import { useState } from 'react';
import { ControllableHeader } from "@/components/ui/elements/text-header";
import Tracker from '@/components/ui/elements/tracker';
import tracker_image from '@/assets/tracker_image.svg'
import useTrackersController from '@/components/controller/trackersController';

export default function BlockTracker() {
    const [editable, setEditable] = useState<boolean>(false);
    const trackersData = useTrackersController(state => state.trackers);
    const modifyTracker = useTrackersController(state => state.modifyTracker);
    const addEmptyTracker = useTrackersController(state => state.addEmptyTracker);

    return (
        <div className='flex flex-col h-full'>
            <ControllableHeader text="Ежедневный трекер привычек" editable={editable} setEditable={setEditable} onAdd={ () => addEmptyTracker() } />
            <div className='flex flex-row mt-2 min-h-0 h-full'>
                <div className='flex flex-col pt-5 w-full min-h-0 overflow-y-auto pr-5 md:h-[196px] space-y-5 md:space-y-0'>
                    {
                        trackersData.map(data => {
                            return <Tracker key={`tracker-${data.id}`} label={data.name} totalSteps={data.totalSteps} step={data.currentStep} onChange={
                                e => modifyTracker(data.id, { id: data.id, name: e.name, currentStep: e.currentStep, totalSteps: e.totalSteps }) } editable={editable}></Tracker>;
                        })
                    }
                </div>
                <img className={`mx-[5%] hidden lg:block`} src={tracker_image}/>
            </div>
        </div>                   
    )
}