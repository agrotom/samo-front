import { Calendar1Icon } from "lucide-react";
import Calendar from "./calendar";
import type { LabeledInputProperties } from "./labeledInput";
import LabeledInput from "./labeledInput";
import { useState } from "react";
import { format } from "date-fns";
import { useIntl } from "react-intl";

export interface LabeledInputDateProperties extends LabeledInputProperties {
    selectedDate: Date,
    setSelectedDate: (value: Date) => void;
}

export default function LabeledInputDate({ selectedDate, setSelectedDate, ...props }: LabeledInputDateProperties) {

    const [openCalendar, setOpenCalendar] = useState<boolean>(false);

    const intl = useIntl();

    return (
        <>
            <div className="flex flex-row relative">
                <LabeledInput disabled={ true } text={ format(selectedDate, "dd.LL.yyyy") } classNames={ { container: 'w-full' } } { ...props } />
                <button type="button" title={ `${ intl.formatMessage({ id: "openCalendar" }) }` } className="cursor-pointer" onClick={ () => setOpenCalendar(true) }>
                    <Calendar1Icon className="absolute right-4 top-1/2" />
                </button>
            </div>
            <Calendar currentDate={ selectedDate } onChange={ setSelectedDate } open={ openCalendar } setOpen={ setOpenCalendar } />
        </>
    );
}