import { FaCheck } from "react-icons/fa";
import EditImage from "@/components/ui/svg/edit"
import { GoPlus } from "react-icons/go";
import { FormattedMessage } from "react-intl";
import InlineEditableText from "./editableDiv";

interface TextHeaderProperties {
    text: string;
    className?: string;
    localization?: boolean;
    children?: React.ReactNode;
}

interface ControllableHeaderProperties extends TextHeaderProperties {
    editable: boolean;
    setEditable: (data: boolean) => void;
    onDone?: () => void;
    onAdd?: () => void;
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

export function EditableTextHeader({ text, className = '', localization = true, children, editable, onChange, ...props }: EditableTextHeaderProperties) {
    return (
        <p className={`font-bold text-lg ${className}`} {...props}>
            <InlineEditableText initText={text} editingAllow={ editable } onChange={ onChange } />
        </p>
    )
}

export function ControllableHeader({ text, editable, setEditable, onDone, onAdd }: ControllableHeaderProperties) {
    return (
        <div className="flex flex-row items-center z-20">
            <TextHeader text={ text }/>
            <div className="flex flex-row ml-auto items-center space-x-3">
                {
                    onAdd && editable &&
                    <button className="cursor-pointer" onClick={onAdd}>
                        <GoPlus className="size-7"/>
                    </button>
                }
                <button className='cursor-pointer' onClick={ () => {
                        if (editable) {
                            onDone?.();
                        }

                        setEditable(!editable);
                    } }>
                    {
                        !editable ?
                        <EditImage/> :
                        <FaCheck className="text-active-bar"/>
                    }
                </button>
            </div>
        </div>
    )
}