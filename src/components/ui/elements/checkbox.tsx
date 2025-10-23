import EditableDiv from "@/components/ui/elements/editableDiv";
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { useRef, useState } from "react";

interface CheckboxProperties {

    className?: string;
    value?: boolean;
    size?: number;
    onChange?: (newValue: boolean) => void;

}

interface SortableCheckboxProperties {
    id: number;
    disabled?: boolean;
    hasLabel?: boolean;
    size?: number;
    initText?: string;
    initEditMode?: boolean;
    onChange?: (data: CheckboxData) => void;
    className?: string;
    value?: boolean;
}

interface CheckboxData {
    value: boolean;
    text: string;
}

export function SortableCheckbox({ initText = '', hasLabel = true, value = false, initEditMode = false, className = '', size = 24, id, disabled = true, onChange, ...props }: SortableCheckboxProperties) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: id, disabled: disabled});
    
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const [text, setText] = useState<string>(initText);

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={`flex overflow-hidden items-start ${className}`} {...props}>
            <Checkbox value={value} size={size} onChange={ newValue => onChange?.({ value: newValue, text: text }) } />
            <EditableDiv initText={initText} editingAllow={!disabled} classNames={{container: 'ml-2.5'}}></EditableDiv>
        </div>
    )
}

export function Checkbox({ value = false, size = 6, className = '', onChange }: CheckboxProperties) {

    const [checked, setChecked] = useState<boolean>(value);

    return (
        <input type="checkbox" style={{
            height: size,
            width: size
        }} checked={checked} onChange={() => { setChecked(!checked); onChange?.(!checked); }} className={`mt-0.5 accent-checkbox-on bg-checkbox-on dark:accent-checkbox-on-dark ${className}`}></input>
    );
}
// { hasLabel && <EditableDiv className="ml-5" initText={initText} initEditing={initEditMode} editingAllow={!disabled} onChange={ newText => {text.current = newText; onChange?.({ value: !checked, text: newText }); } }/> }
// <label htmlFor="default-checkbox" className="ml-2 whitespace-normal break-all w-full">{text}</label>