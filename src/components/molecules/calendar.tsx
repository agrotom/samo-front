import { useEffect, useState } from "react";
import { DayPicker, Dropdown, getDefaultClassNames, YearsDropdown } from "react-day-picker";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LuSquareArrowDown } from "react-icons/lu";
import { createPortal } from "react-dom"

import { ru } from "react-day-picker/locale";

import { type MonthCaptionProps, useDayPicker } from "react-day-picker";

function CustomCaptionComponent(props: MonthCaptionProps) {
  const { goToMonth, nextMonth, previousMonth } = useDayPicker();

  return (
    <div className='flex flex-row items-center justify-center'>
      <button
        className='mx-auto'
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <h2 className='text-center'>{format(props.calendarMonth.date, "LLLL", { locale: ru })}</h2>
      <button
        className='mx-auto'
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

interface CalendarProperties {
    currentDate?: Date;
    open?: boolean;
    setOpen?:(value: boolean) => void;
    onChange?: (date: Date) => void;
}
export default function Calendar({ currentDate = new Date(), onChange, open, setOpen }: CalendarProperties) {
    const defaultClassNames = getDefaultClassNames();
    const [show, setShow] = useState(open ?? false);
    const [selected, setSelected] = useState<Date>(currentDate);

    useEffect(() => {
      if (open !== undefined) {
        setShow(open);
      }
    }, [open]);

    return (
        <div className="">
            {
              open === undefined &&
              <div className="flex flex-row cursor-pointer items-center justify-center" onClick={() => setShow(!show)}>
                  <input
                      type="text"
                      readOnly
                      disabled
                      value={format(selected, "dd.LL.yyyy", {locale: ru}) + ' ' + selected.toLocaleDateString("ru-RU", { weekday: 'short' }).toUpperCase()}
                      className="rounded font-medium text-lg w-38 tracking-wider"/>
                  <LuSquareArrowDown className="text-primary  size-6"/>
              </div>
            }

            {show &&
                createPortal(
                <div
                    className="fixed inset-0 flex justify-center items-center bg-black/20 z-[9999]"
                    onClick={() => {
                      if (setOpen !== undefined) {
                        setOpen(false);
                      }
                      else {
                        setShow(false);
                      }
                    }}
                >
                    <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-brand  rounded-xs shadow-xl w-80 h-88"
                    >
                        <DayPicker
                            locale={ru}
                            required
                            showOutsideDays
                            defaultMonth={selected}
                            mode="single"
                            navLayout="around"
                            selected={selected}
                            onSelect={value => { setSelected(value); onChange?.(value); }}
                            captionLayout="dropdown-years"
                            components={{
                                MonthCaption: CustomCaptionComponent
                            }}
                            
                            classNames={{
                                selected: `border-b-2 border-b-active-bar font-bold text-active-bar`,
                                 // Highlight the selected day
                                root: `${defaultClassNames.root} flex items-center justify-center text-center text-primary`, // Add a shadow to the root element
                                chevron: `${defaultClassNames.chevron} hidden`, // Change the color of the chevron
                                day: `hover:bg-brand-active hover:text-active-bar w-10 h-10`,
                                day_button: `min-h-full min-w-full`,
                                week: `h-10`,
                                month_caption: `w-32`,
                                years_dropdown: 'h-5'
                            }}/>
                    </div>
                </div>,
                document.body)}
        </div>
    )
}