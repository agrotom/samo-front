import { FaCheck } from "react-icons/fa";
import EditImage from "@/components/ui/svg/edit"
import { GoPlus } from "react-icons/go";

interface TextHeaderProperties {
    text: string;
    className?: string;
}

interface ControllableHeaderProperties extends TextHeaderProperties {
    editable: boolean;
    setEditable: (_: boolean) => void;
    onDone?: () => void;
    onAdd?: () => void;
}

export default function TextHeader({ text, className = '', ...props }: TextHeaderProperties) {
    return (
        <p className={`font-bold text-lg ${className}`} {...props}>{text}</p>
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
                        <FaCheck className="text-active-bar dark:text-active-bar-dark"/>
                    }
                </button>
            </div>
        </div>
    )
}