import type { WeekHabit } from "@/api/diary";
import type SavingProperties from "@/components/ui/common/saving";
import { Checkbox } from "./checkbox";
import InlineEditableText from "./editableDiv";
import type EditableProperties from "../common/editable";

interface WeekHabitsProperties extends SavingProperties<WeekHabit>, EditableProperties {
    
}

export function WeekHabits({ loadedData, onSave, editable }: WeekHabitsProperties) {
    return (
        <>
            <div className="col-start-1 w-64">
                <InlineEditableText initText={loadedData.text} onChange={ text => loadedData.text = text } editingAllow={editable} limit={30} classNames={{container: "h-7 w-full overflow-hidden", span: "h-5"}} />
            </div>
            {
                loadedData.checks.map((check, i) => {
                    return (
                        <div key={`div-${i}`} className={`col-start-${i + 2} items-center justify-center text-center`}>
                            <Checkbox key={`checkbox-${i}`} onChange={(value) => loadedData.checks[i] = value } value={check} size={16} ></Checkbox>
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