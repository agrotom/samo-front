
import { useEffect, useRef, useState } from "react";
import { FaStar, FaRegStar, FaRegTrashAlt } from "react-icons/fa";
import { ControllableHeader } from "@/components/atoms/text-header";
import InlineEditableText from "@/components/atoms/editableDiv";
import BlockInput from "./blockInput";
import { clamp } from "@/util/math";
import useStarsController from "@/controller/starsController";
import { FormattedMessage } from "react-intl";

interface StarLabelChangedEvent {
    text: string;
    level: number;
}

interface StarLabelProperties {
    initLevel: number;
    initText: string;
    onChange?: (data: StarLabelChangedEvent) => void;
    onDelete?: () => void;
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
                <FaStar className={`size-6 ${'text-active-bar-alt'}`}/> :
                <FaRegStar className={`size-6`}/>
            }
        </button>

    );
}

export function StarLabel({initLevel, initText, onChange, readonly = false, editable = false, onDelete }: StarLabelProperties) {

    const [level, setLevel] = useState<number>(clamp(initLevel, 0, 3));
    const [text, setText] = useState<string>(initText.slice(0, 30));

    useEffect(() => {
        onChange?.({ text: text, level: level });
    }, [level, text]);

    return (
        <>
            <div className="col-start-1 h-6 flex my-auto">
                <InlineEditableText initText={ text } limit={30} onChange={ setText } editingAllow={editable}/>
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
                <button className={ `cursor-pointer ml-auto mr-5 ${ !editable && 'hidden' }` } onClick={ onDelete }>
                    <FaRegTrashAlt/>
                </button>
            </div>
        </>
    );
}

export default function BlockStar() {

    const tomorrowMainTasksText = useStarsController(state => state.tomorrowMainTasksText);
    const setTomorrowMainTasksText = useStarsController(state => state.setTomorrowMainTasksText);

    const todayDeeds = useStarsController(state => state.todayDeeds); 
    const addEmptyTodayDeed = useStarsController(state => state.addEmptyTodayDeed); 
    const modifyTodayDeed = useStarsController(state => state.modifyTodayDeed); 
    const removeTodayDeed = useStarsController(state => state.removeTodayDeed); 

    const [editable, setEditable] = useState<boolean>(false);

    return (

        <div className="flex flex-col h-full">
            <ControllableHeader text="today_deeds" onAdd={ addEmptyTodayDeed } editable={editable} setEditable={setEditable} />
            <div className="grid grid-cols-2 grid-rows-1 mt-2 auto-rows-min">
                <p className="col-start-2 text-sm"><FormattedMessage id="importance" /></p>
            </div>
            <div className="grid grid-cols-2 h-[128px] overflow-y-scroll mb-5">
                {
                    todayDeeds.map(data => <StarLabel key={ data.id } initText={ data.text } initLevel={ data.level } onChange={ e => modifyTodayDeed(data.id, { ...data, text: e.text, level: e.level }) } editable={editable} onDelete={ () => { removeTodayDeed(data.id) } } />)
                }
            </div>
            <BlockInput header="tomorrow_main_deeds" initText={ tomorrowMainTasksText } onChange={ data => setTomorrowMainTasksText(data) } outerEditable={editable} outerControl classNames={
                {
                    container: "lg:mr-70"
                }
            } />
        </div>
    );
}