import InlineEditableText from "@/components/atoms/editableDiv";
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { useIntl } from "react-intl";

interface CheckboxProperties {
    name?: string;
    title?: string;
    className?: string;
    value?: boolean;
    size?: number;
    disabled?: boolean;
    onChange?: (newValue: boolean) => void;

}

interface SortableCheckboxProperties {
    id: number;
    title?: string;
    allowEditing?: boolean;
    disabled?: boolean;
    hasLabel?: boolean;
    size?: number;
    initText?: string;
    initEditMode?: boolean;
    onChange?: (data: CheckboxData) => void;
    onDelete?: () => void;
    className?: string;
    value?: boolean;
}

interface CheckboxData {
    value: boolean;
    text: string;
}

export function SortableCheckbox({ title, initText = '', hasLabel = true, value = false, className = '', size = 24, id, disabled = false, allowEditing = true, onChange, onDelete, ...props }: SortableCheckboxProperties) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: id, disabled: allowEditing});
    
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const [checked, setChecked] = useState<boolean>(value);
    const [text, setText] = useState<string>(initText);

    const intl = useIntl();

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={`flex overflow-hidden items-start ${ !allowEditing && 'cursor-pointer' } ${className}`} {...props}>
            <Checkbox name={ `checkbox_${ id }` } title={ `${ intl.formatMessage({ id: "select" }) }` } disabled={ disabled } value={value} size={size} onChange={ newValue => { setChecked(newValue); onChange?.({ value: newValue, text: text }); } } />
            <InlineEditableText initText={initText} editingAllow={ allowEditing && !disabled } onChange={ text => { setText(text); onChange?.({ value: checked, text: text }); } } classNames={{container: 'ml-2.5'}}></InlineEditableText>
            <button type="button" title={ `${ intl.formatMessage({ id: "delete" }) }` } className={ `cursor-pointer ml-auto mr-5 my-auto ${ allowEditing && 'hidden' }` } onClick={ onDelete }>
                <FaRegTrashAlt/>
            </button>
        </div>
    )
}

export function Checkbox({ name, title, value = false, size = 6, disabled = false, className = '', onChange }: CheckboxProperties) {

    const [checked, setChecked] = useState<boolean>(value);

    return (
        <input type="checkbox" name={ name } title={ title } disabled={ disabled } style={{
            height: size,
            width: size
        }} checked={checked} onChange={() => { setChecked(!checked); onChange?.(!checked); }} className={`mt-0.5 accent-checkbox-on bg-checkbox-on ${className}`}></input>
    );
}
// { hasLabel && <EditableDiv className="ml-5" initText={initText} initEditing={initEditMode} editingAllow={!disabled} onChange={ newText => {text.current = newText; onChange?.({ value: !checked, text: newText }); } }/> }
// <label htmlFor="default-checkbox" className="ml-2 whitespace-normal break-all w-full">{text}</label>