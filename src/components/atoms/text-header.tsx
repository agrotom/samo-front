import { FaCheck } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { FormattedMessage, useIntl } from "react-intl";
import InlineEditableText from "./editableDiv";
import { RxCross2 } from "react-icons/rx";
import { EditIcon } from "./Icon";

interface TextHeaderProperties {
    text: string;
    className?: string;
    localization?: boolean;
    children?: React.ReactNode;
}

interface ControllableHeaderProperties extends TextHeaderProperties {
    editable: boolean;
    disabled?: boolean;
    allowHeaderEdit?: boolean;
    setEditable: (data: boolean) => void;
    onChange?: (value: string) => void;
    onDone?: () => void;
    onAdd?: () => void;
    onDelete?: () => void;
}

interface EditableTextHeaderProperties extends TextHeaderProperties {
    editable: boolean;
    onChange?: (data: string) => void;
}

export default function TextHeader({ text, className = '', localization = true, children, ...props }: TextHeaderProperties) {
    return (
        <p className={`font-bold text-lg ${className}`} {...props}>
            { localization ? <FormattedMessage id={text} /> : text }
        </p>
    )
}

export function EditableTextHeader({ text, className = '', localization = false, children, editable, onChange, ...props }: EditableTextHeaderProperties) {
    return (
        <div className={`font-bold text-lg ${className}`} {...props}>
            <InlineEditableText classNames={ { input: "w-24" } } initText={text} editingAllow={ editable } onChange={ onChange } />
        </div>
    )
}

export function ControllableHeader({ text, disabled, allowHeaderEdit = false, editable, setEditable, onChange, onDone, onAdd, onDelete }: ControllableHeaderProperties) {
    
    const intl = useIntl();
    
    return (
        <div className="flex flex-row items-center z-20">
            {
                allowHeaderEdit ?
                <EditableTextHeader text={ text } editable={ editable } onChange={ onChange } /> :
                <TextHeader text={ text } />
            }
            
            <div className="flex flex-row ml-auto items-center space-x-3">
                {
                    onDelete && editable &&
                    <button type="button" title={ `${ intl.formatMessage({ id: "delete" }) }` } className='cursor-pointer' onClick={ onDelete }>
                        <RxCross2 className='size-5' />
                    </button>
                }
                {
                    onAdd && editable &&
                    <button type="button" title={ `${ intl.formatMessage({ id: "add" }) }` } className="cursor-pointer" onClick={ onAdd }>
                        <GoPlus className="size-7"/>
                    </button>
                }
                <button type="button" title={ `${ intl.formatMessage({ id: editable ? "ok" : "edit" }) }` } className={`cursor-pointer ${ disabled && 'hidden' }`} onClick={ () => {
                        if (editable) {
                            onDone?.();
                        }

                        setEditable(!editable);
                    } }>
                    {
                        !editable ?
                        <EditIcon /> :
                        <FaCheck className="text-active-bar"/>
                    }
                </button>
            </div>
        </div>
    )
}