import { getTodayDeeds, getTomorrowMainTasks, saveTodayDeeds, saveTomorrowMainTasks, type TodayDeeds } from "@/api/diary";
import { useEffect, useRef, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { ControllableHeader } from "@/components/ui/elements/text-header";
import InlineEditableText from "@/components/ui/elements/editableDiv";
import BlockInput from "./blockInput";
import { clamp } from "@/util/math";
import type SavingProperties from "@/components/ui/common/saving";
import { type SaveFuncType } from "@/components/ui/common/saving";

interface StarLabelProperties extends SavingProperties<TodayDeeds> {
    onSave?: SaveFuncType<TodayDeeds>;
    readonly?: boolean;
    editable?: boolean;
}

interface StarProperties {
    isActive: boolean;
    onClick: () => void; 
}

function Star({ isActive = false, onClick}: StarProperties) {

    return (

        <button className="cursor-pointer" onClick={onClick}>
            {
                isActive ?
                <FaStar className={`size-6 ${'text-active-bar-dark'}`}/> :
                <FaRegStar className={`size-6`}/>
            }
        </button>

    );
}

export function StarLabel({loadedData, onSave, readonly = false, editable = false}: StarLabelProperties) {

    const [level, setLevel] = useState<number>(clamp(loadedData.level, 0, 3));
    const text = useRef<string>(loadedData.text.slice(0, 30));

    useEffect(() => {
        loadedData.level = level;
        loadedData.text = text.current;
        onSave?.(loadedData);
    }, [level]); //<div className="flex flex-row items-center"> <p className="text-wrap break-all">{text}</p>

    return (
        <>
            <div className="col-start-1 h-6">
                <InlineEditableText initText={text.current} limit={30} onChange={ data => { loadedData.text = data; onSave?.(loadedData); } } editingAllow={editable}/>
            </div>
            <div className="cols-start-2 flex flex-row">
                <Star isActive={level > 0} onClick={() => {
                    if (readonly) {
                        return;
                    }

                    if (level != 1) {
                        setLevel(1);
                    }
                    else {
                        setLevel(0);
                    }
                }}/>
                <Star isActive={level > 1} onClick={() => {
                    if (readonly) {
                        return;
                    }

                    if (level != 2) {
                        setLevel(2);
                    }
                    else {
                        setLevel(1);
                    }
                }}/>
                <Star isActive={level > 2} onClick={() => {
                    if (readonly) {
                        return;
                    }

                    if (level != 3) {
                        setLevel(3);
                    }
                    else {
                        setLevel(2);
                    }
                }}/>
            </div>
        </>
    );
}

export default function BlockStar() {
    const [todayDeeds, setTodayDeeds] = useState<TodayDeeds[]>(getTodayDeeds());
    const [editable, setEditable] = useState<boolean>(false);

    const reserveTodayDeedsID = () => {
        var sorted = todayDeeds.sort((a, b) => a.id - b.id);
        if (sorted.length > 0) {
            return sorted[sorted.length - 1].id;
        }

        return 0;
    }

    useEffect(() => {
        saveTodayDeeds(todayDeeds);
    }, [todayDeeds]);

    return (

        <div className="flex flex-col h-full">
            <ControllableHeader text="Что было сегодня сделано" onAdd={ () => setTodayDeeds([...todayDeeds, { id: reserveTodayDeedsID(), text: "Без названия", level: 0 }]) } editable={editable} setEditable={setEditable} />
            <div className="grid grid-cols-2 grid-rows-1 mt-2 auto-rows-min">
                <p className="col-start-2 text-sm">Важность</p>
            </div>
            <div className="grid grid-cols-2 h-[128px] overflow-y-scroll mb-5">
                {
                    todayDeeds.map(data => <StarLabel key={data.id} onSave={() => saveTodayDeeds(todayDeeds)} editable={editable} loadedData={data}/>)
                }
            </div>
            <BlockInput header="Главные задачи на завтра" loadedData={getTomorrowMainTasks()} onSave={data => saveTomorrowMainTasks(data)} outerEditable={editable} outerControl classNames={
                {
                    container: "lg:mr-70"
                }
            } />
        </div>
    );
}