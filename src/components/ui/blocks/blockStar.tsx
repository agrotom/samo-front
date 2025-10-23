import { getFocus, getTomorrowMainTasks, saveFocus, saveTomorrowMainTasks, type TodayDeeds } from "@/api/diary";
import { useEffect, useRef, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { ControllableHeader } from "@/components/ui/elements/text-header";
import InlineEditableText from "@/components/ui/elements/editableDiv";
import BlockInput, { BlockInputControllable } from "./blockInput";
import { clamp } from "@/util/math";
import type SavingProperties from "@/components/ui/common/saving";
import { defaultSaveFunc, type SaveFuncType } from "@/components/ui/common/saving";

interface BlockStarProperties extends SavingProperties<TodayDeeds[]> {
    header: string;
}

interface StarLabelProperties {
    initLevel: number;
    initText: string;
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

export function StarLabel({initLevel, initText, onSave, readonly = false, editable = false}: StarLabelProperties) {

    const [level, setLevel] = useState<number>(clamp(initLevel, 0, 3));
    const text = useRef<string>(initText);

    useEffect(() => {
        onSave?.({ level: level, text: text.current });
    }, [level, text]); //<div className="flex flex-row items-center"> <p className="text-wrap break-all">{text}</p>

    return (
        <>
            <div className="col-start-1 h-6 overflow-auto">
                <InlineEditableText initText={text.current} onChange={ data => { text.current = data; onSave?.({ level: level, text: data }); } } editingAllow={editable}/>
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

export default function BlockStar({ header, loadedData = [], onSave = defaultSaveFunc }: BlockStarProperties) {
    const [todayDeeds, setTodayDeeds] = useState<TodayDeeds[]>(loadedData);
    const [editable, setEditable] = useState<boolean>(false);

    useEffect(() => {
        onSave(todayDeeds);
    }, [todayDeeds]);

    return (

        <div className="flex flex-col h-full">
            <ControllableHeader text={header} editable={editable} setEditable={setEditable} />
            <div className="grid grid-cols-2 grid-rows-1 mt-2 auto-rows-min">
                <p className="col-start-2 text-sm -ml-1.5">Важность</p>
            </div>
            <div className="grid grid-cols-2 h-[128px] overflow-y-scroll mb-5">
                {
                    todayDeeds.map(data => <StarLabel initLevel={data.level} initText={data.text} onSave={data => onSave([data]) } editable={editable}/>)
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