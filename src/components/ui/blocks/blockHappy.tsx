import type SavingProperties from "@/components/ui/common/saving";
import TextHeader, { ControllableHeader } from "@/components/ui/elements/text-header";
import { useState } from "react";
import Tracker from "../elements/tracker";
import { WeekHabits, WeekHabitsGrid } from "../elements/weekHabits";
import { getWeekHabits } from "@/api/diary";
import DiaryResultModal from "../unused/diaryResultModal";

export default function BlockHappy() {

    const [editable, setEditable] = useState<boolean>(false);

    return (

        <div className="flex flex-col">
            <ControllableHeader text="Насколько я доволен работой" editable={editable} setEditable={setEditable}/>
            <Tracker className="mt-2.5" stretch={true} step={1} />

            <TextHeader text="Насколько я доволен собой"/>
            <Tracker className="mt-2.5" stretch={true} step={1} />

            <TextHeader text="Недельный трекер привычек"/>
            <WeekHabitsGrid>
                <WeekHabits loadedData={getWeekHabits()[0]}/>
                <WeekHabits loadedData={getWeekHabits()[1]}/>
                <WeekHabits loadedData={getWeekHabits()[2]}/>
            </WeekHabitsGrid>
        </div>

    );
}