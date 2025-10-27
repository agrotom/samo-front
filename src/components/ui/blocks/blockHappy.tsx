import TextHeader, { ControllableHeader } from "@/components/ui/elements/text-header";
import { useEffect, useRef, useState } from "react";
import Tracker from "../elements/tracker";
import { WeekHabits, WeekHabitsGrid } from "../elements/weekHabits";
import { getSelfHappines, getWeekHabits, getWorkHappines, saveWeekHabits, setSelfHappiness, setWorkHappiness, type WeekHabit } from "@/api/diary";
import type { TrackerData } from "@/api/trackers";

export default function BlockHappy() {

    const [editable, setEditable] = useState<boolean>(false);
    const [weekHabits, setWeekHabits] = useState<WeekHabit[]>(getWeekHabits());

    const workHappiness = useRef<TrackerData>(getWorkHappines());
    const selfHappiness = useRef<TrackerData>(getSelfHappines());

    useEffect(() => {
        if (!editable) {
            saveWeekHabits(weekHabits);
        }
    }, [editable]);

    return (

        <div className="flex flex-col">
            <ControllableHeader text="Насколько я доволен работой" editable={editable} setEditable={setEditable}/>
            <Tracker className="mt-2.5" stretch={true} step={1} onChange={ data => setWorkHappiness(data) } loadedData={workHappiness.current} editable={editable} />

            <TextHeader text="Насколько я доволен собой"/>
            <Tracker className="mt-2.5" stretch={true} step={1} onChange={ data => setSelfHappiness(data) } loadedData={selfHappiness.current} editable={editable} />

            <TextHeader text="Недельный трекер привычек"/>
            <WeekHabitsGrid>
                {
                    weekHabits.slice(0, 3).map((weekHabit) => <WeekHabits key={`weekHabit-${weekHabit.id}`} loadedData={ weekHabit } editable={ editable } onSave={ _ => saveWeekHabits(weekHabits) } />)
                }
            </WeekHabitsGrid>
        </div>

    );
}