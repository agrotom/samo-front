import type { WeekHabit } from "@/api/diary";
import type SavingProperties from "@/components/ui/common/saving";
import { Checkbox, SortableCheckbox } from "./checkbox";

interface WeekHabitsProperties extends SavingProperties<WeekHabit> {
    
}

//<SortableCheckbox id={i} value={check} hasLabel={false} size={5} ></SortableCheckbox>

export function WeekHabits({ loadedData, onSave }: WeekHabitsProperties) {
    return (
        <>
            <div className="col-start-1 w-64">
                {loadedData?.text}
            </div>
            {
                loadedData?.checks.map((check, i) => {
                    return (
                        <div className={`col-start-${i + 2} items-center justify-center text-center`}>
                            <Checkbox value={check} size={16} ></Checkbox>
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
            <p className="col-start-2 text-center text-sm">пн</p>
            <p className="col-start-3 text-center text-sm">вт</p>
            <p className="col-start-4 text-center text-sm">ср</p>
            <p className="col-start-5 text-center text-sm">чт</p>
            <p className="col-start-6 text-center text-sm">пт</p>
            <p className="col-start-7 text-center text-sm">сб</p>
            <p className="col-start-8 text-center text-sm">вс</p>
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