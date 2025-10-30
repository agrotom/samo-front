import type { WeekHabit } from "@/api/diary";
import type SavingProperties from "@/components/ui/common/saving";
import { Checkbox } from "./checkbox";
import InlineEditableText from "./editableDiv";
import type EditableProperties from "../common/editable";
import { useEffect, useState } from "react";

interface WeekHabitChangedEvent {
    checks: boolean[];
    text: string;
}

interface WeekHabitsProperties extends EditableProperties {
    onChange?: (e: WeekHabitChangedEvent) => void;
    initText: string;
    initChecks: boolean[];
}

export function WeekHabits({ initText, initChecks, onChange, editable }: WeekHabitsProperties) {

    const [checks, setChecks] = useState<boolean[]>(initChecks);
    const [text, setText] = useState<string>(initText);

    useEffect(() => {
        onChange?.({ checks: checks, text: text });
    }, [checks, text]);

    return (
        <>
            <div className="col-start-1 w-64">
                <InlineEditableText initText={initText} onChange={ text => setText(text) } editingAllow={editable} limit={30} classNames={{container: "h-7 w-full overflow-hidden", span: "h-5"}} />
            </div>
            {
                checks.map((check, i) => {
                    return (
                        <div key={`div-${i}`} className={`col-start-${i + 2} items-center justify-center text-center`}>
                            <Checkbox key={`checkbox-${i}`} onChange={value => setChecks(checks.map((oldValue, index) => index == i ? value : oldValue)) } value={check} size={16} ></Checkbox>
                        </div>
                    );
                })
            }
        </>
    );
}

interface WeekHabitsGridProperties {
    children: React.ReactNode[] | React.ReactNode;
}

function getWeekDays() {
    
    const weekdays = [ 'пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс' ]

    return (
        <>
            {
                weekdays.map((weekDay, i) => <p key={i} className={`col-start-${i + 2} text-center text-sm`}>{weekDay}</p>)
            }
        </>
    );
}

export function WeekHabitsGrid({ children }: WeekHabitsGridProperties) {

    return (

        <div className="grid grid-cols-[auto_auto_auto] grid-rows-4">
            <div className="hidden lg:block lg:col-start-1"></div>
            {
                getWeekDays()
            }
            {
                children
            }
        </div>

    );
}