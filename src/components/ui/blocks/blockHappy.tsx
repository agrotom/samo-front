import TextHeader, { ControllableHeader } from "@/components/ui/elements/text-header";
import { useEffect, useRef, useState } from "react";
import Tracker from "../elements/tracker";
import { WeekHabits, WeekHabitsGrid } from "../elements/weekHabits";
import { getSelfHappines, getWeekHabits, getWorkHappines, saveWeekHabits, setSelfHappiness, setWorkHappiness, type WeekHabit } from "@/api/diary";
import type { TrackerData } from "@/api/trackers";
import useHappyBlockController from "@/components/controller/happyBlockController";

export default function BlockHappy() {

    const [editable, setEditable] = useState<boolean>(false);

    const workHappiness = useHappyBlockController(state => state.workHappinessTracker);
    const setWorkHappiness = useHappyBlockController(state => state.setWorkHappinessTracker);

    const selfHappiness = useHappyBlockController(state => state.selfHappinessTracker);
    const setSelfHappiness = useHappyBlockController(state => state.setSelfHappinessTracker);

    const weekHabits = useHappyBlockController(state => state.weekHabits);
    const modifyWeekHabits = useHappyBlockController(state => state.modifyWeekHabits);

    return (

        <div className="flex flex-col">
            <ControllableHeader text="Насколько я доволен работой" editable={editable} setEditable={setEditable}/>
            <Tracker className="mt-2.5" stretch={true} step={workHappiness} onChange={ e => setWorkHappiness(e.currentStep) } editable={editable} />

            <TextHeader text="Насколько я доволен собой"/>
            <Tracker className="mt-2.5" stretch={true} step={selfHappiness} onChange={ e => setSelfHappiness(e.currentStep) } editable={editable} />

            <TextHeader text="Недельный трекер привычек"/>
            <WeekHabitsGrid>
                {
                    weekHabits.slice(0, 3).map((weekHabit) => <WeekHabits key={`weekHabit-${weekHabit.id}`} initText={ weekHabit.text } initChecks={ weekHabit.checks } editable={ editable } onChange={ e => modifyWeekHabits(weekHabit.id, { ...weekHabit, text: e.text, checks: e.checks }) } />)
                }
            </WeekHabitsGrid>
        </div>

    );
}