import { useState } from 'react';
import { ControllableHeader } from "@/components/ui/elements/text-header";
import { type TrackerData } from '@/api/trackers';
import Tracker from '@/components/ui/elements/tracker';
import tracker_image from '@/assets/tracker_image.svg'

interface BlockTrackerProperties {
    loadedData?: TrackerData[];
    onSave: (data: TrackerData) => void;
}

export default function BlockTracker({ loadedData = [], onSave }: BlockTrackerProperties) {
    const [editable, setEditable] = useState<boolean>(false);

    return (
        <div className='flex flex-col h-full'>
            <ControllableHeader text="Ежедневный трекер привычек" editable={editable} setEditable={setEditable} />
            <div className='flex flex-row mt-2 min-h-0 h-full'>
                <div className='flex flex-col pt-5 w-full min-h-0 overflow-y-auto pr-5 md:h-[196px] space-y-5 md:space-y-0'>
                    {
                        loadedData.map(data => {
                            return <Tracker label={data.name} totalSteps={data.totalSteps} step={data.currentStep} onChange={
                                newData => onSave(newData)
                            }></Tracker>;
                        })
                    }
                </div>
                <img className={`mx-[5%] hidden lg:block`} src={tracker_image}/>
            </div>
        </div>                   
    )
}