import { useEffect, useRef, useState, type JSX } from "react";
import TextHeader, { ControllableHeader } from "@/components/ui/elements/text-header";
import type SavingProperties from "../common/saving";

interface BlockInputClassNames {
    textarea?: string;
    paragraph?: string;
    container?: string;
    block?: string;
}

interface BlockInputProperties {
    header: string;
    children?: JSX.Element;
    classNames?: BlockInputClassNames;
    initText?: string;
    onChange?: (text: string) => void;
}

interface BlockInputControllableProperties extends BlockInputProperties {
    outerControl?: boolean;
    outerEditable?: boolean;
}

export function BlockInputControllable({ header, initText = '', children, onChange, outerControl }: BlockInputControllableProperties) {
    const [text, setText] = useState<string>(initText);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        onChange?.(text);
    }, [text]);

    return (
        <>
            <TextHeader text={header} />
            {
                <div className={`flex flex-row relative overflow-hidden h-full mt-5`}>
                    <textarea ref={textAreaRef} value={ text } onChange={ value => setText(value.target.value) } className={ `border-active-bar dark:border-active-bar-dark border-2 p-2 outline-0 rounded-lg w-full h-[75%] box-border shadow-inner resize-none text-wrap break-all ${ !outerControl && 'hidden' } ${ children && 'mr-5' }` }/>
                    <p className={ `whitespace-pre-line h-[75%] overflow-y-auto outline-0 w-full text-wrap break-all ${outerControl && 'hidden'}` }>
                        { text }
                    </p>
                    {
                        children
                    }
                </div>
            }
        </>
    )
}

export default function BlockInput({ header, initText = '', children, onChange, outerControl = false, outerEditable = false, classNames = { textarea: '', paragraph: '', container: '' }}: BlockInputControllableProperties) {
    const [editable, setEditable] = useState<boolean>(false);
    const [text, setText] = useState<string>(initText);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const isEditMode = () => editable || outerEditable;

    useEffect(() => {
        if ((editable && !outerControl) || (outerEditable && outerControl)) {
            textAreaRef.current?.focus();
            textAreaRef.current?.setSelectionRange(text.length, text.length);
        }
    }, [editable, outerEditable]);
    
    return (
        <div className={`flex flex-col h-full ${classNames.block}`}>
            {
                outerControl ?
                <TextHeader text={header} /> :
                <ControllableHeader text={header} editable={editable} setEditable={setEditable} onDone={ () => onChange?.(text) } />
            }
            {
                <div className={`flex flex-row relative box-border overflow-y-auto overflow-x-clip h-full min-h-0 mt-1 ${classNames.container}`}>
                    {
                        isEditMode() ?
                        <textarea onBlur={ () => { if (!outerControl) setEditable(false); onChange?.(text); } } ref={textAreaRef} value={ text } onChange={ value => setText(value.target.value) } className={ `block border-active-bar dark:border-active-bar-dark border-2 p-2 outline-0 rounded-lg w-full h-full box-border shadow-inner resize-none text-wrap break-all ${ children && 'mr-5' } ${classNames.textarea}` }/> :
                        <p className={ `block box-border whitespace-pre-line h-10 overflow-y-visible pr-5 w-full text-wrap min-h-0 break-all ${classNames.paragraph}` }>
                            { text }
                        </p>
                    }
                    {
                        children
                    }
                </div>
            }
        </div>
    )
}