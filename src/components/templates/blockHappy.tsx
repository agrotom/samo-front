import TextHeader, { ControllableHeader } from "@/components/atoms/text-header";
import { useState } from "react";
import Tracker from "../molecules/tracker";
import { WeekHabits, WeekHabitsGrid } from "../molecules/weekHabits";
import useHappyBlockController from "@/controller/happyBlockController";

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
            <ControllableHeader text="work_happy" editable={editable} setEditable={setEditable}/>
            <Tracker classNames={{ container: "mt-2.5", trackerLine: "bg-active-bar-alt" }} stretch={true} step={workHappiness} onChange={ e => setWorkHappiness(e.currentStep) } editable={editable} />

            <TextHeader text="self_happy"/>
            <Tracker classNames={{ container: "mt-2.5", trackerLine: "bg-active-bar-alt" }} stretch={true} step={selfHappiness} onChange={ e => setSelfHappiness(e.currentStep) } editable={editable} />

            <TextHeader text="weekly_habits_header"/>
            <WeekHabitsGrid>
                {
                    weekHabits.slice(0, 3).map((weekHabit) => <WeekHabits key={`weekHabit-${weekHabit.id}`} initText={ weekHabit.text } initChecks={ weekHabit.checks } editable={ editable } onChange={ e => modifyWeekHabits(weekHabit.id, { ...weekHabit, text: e.text, checks: e.checks }) } />)
                }
            </WeekHabitsGrid>
        </div>

    );
}