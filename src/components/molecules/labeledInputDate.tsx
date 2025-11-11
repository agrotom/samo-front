import { Calendar1Icon } from "lucide-react";
import Calendar from "./calendar";
import type { LabeledInputProperties } from "./labeledInput";
import LabeledInput from "./labeledInput";
import { useState } from "react";

export default function LabeledInputDate({ ...props }: LabeledInputProperties) {

    const [openCalendar, setOpenCalendar] = useState<boolean>(false);

    return (
        <>
            <div className="flex flex-row relative">
                <LabeledInput classNames={ { container: 'w-full' } } { ...props } />
                <button className="cursor-pointer" onClick={ () => setOpenCalendar(true) }>
                    <Calendar1Icon className="absolute right-4 top-1/2" />
                </button>
            </div>
            <Calendar open={ openCalendar } setOpen={ setOpenCalendar } />
        </>
    );
}