import { FaCheck } from "react-icons/fa";
import EditImage from "@/components/ui/svg/edit"

interface TextHeaderProperties {
    text: string;
    className?: string;
}

interface ControllableHeaderProperties extends TextHeaderProperties {
    editable: boolean;
    setEditable: (_: boolean) => void;
    onDone?: () => void;
}

export default function TextHeader({ text, className = '', ...props }: TextHeaderProperties) {
    return (
        <p className={`font-bold text-lg ${className}`} {...props}>{text}</p>
    )
}

export function ControllableHeader({ text, editable, setEditable, onDone }: ControllableHeaderProperties) {
    return (
        <div className="flex flex-row items-center z-20">
            <TextHeader text={ text }/>
            <button className='ml-auto cursor-pointer' onClick={ () => {
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
    )
}