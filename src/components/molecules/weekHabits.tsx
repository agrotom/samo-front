import { Checkbox } from "../atoms/checkbox";
import InlineEditableText from "../atoms/editableDiv";
import type EditableProperties from "../../util/editable";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

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
        <div className="grid grid-cols-7 lg:grid-cols-[auto_repeat(7,1fr)] grid-rows-2 lg:grid-rows-1 mt-2">
            <div className="lg:col-start-1 lg:row-start-1 w-64">
                <InlineEditableText initText={initText} onChange={ text => setText(text) } editingAllow={editable} limit={30} classNames={{container: "h-7 overflow-hidden", span: "h-5"}} />
            </div>
                {
                    checks.map((check, i) => {
                        return (
                            <div key={`div-${i}`} className={`lg:col-start-${i + 2} row-start-2 lg:row-start-1 items-center justify-center text-center`}>
                                <Checkbox key={`checkbox-${i}`} onChange={value => setChecks(checks.map((oldValue, index) => index == i ? value : oldValue)) } value={check} size={16} ></Checkbox>
                            </div>
                        );
                    })
                }
        </div>
    );
}

interface WeekHabitsGridProperties {
    children: React.ReactNode[] | React.ReactNode;
}

function getWeekDays() {
    
    const weekdays = [ 'monday_short', 'tuesday_short', 'wednesday_short', 'thursday_short', 'friday_short', 'saturday_short', 'sunday_short' ]

    return (
        <>
            {
                weekdays.map((weekDay, i) => <p key={i} className={`col-start-${i + 2} text-center text-sm`}><FormattedMessage id={weekDay} /></p>)
            }
        </>
    );
}

export function WeekHabitsGrid({ children }: WeekHabitsGridProperties) {

    return (
        <>
            <div className="grid grid-cols-[auto_repeat(7,1fr)] grid-rows-1 auto-cols-fr">
                <div className="hidden lg:block lg:col-start-1 w-64"></div>
                {
                    getWeekDays()
                }
            </div>
            {
                children
            }
        </>
    );
}