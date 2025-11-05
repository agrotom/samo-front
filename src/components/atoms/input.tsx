import { type InputHTMLAttributes } from "react";
import { RiCloseCircleFill } from "react-icons/ri";

interface InputProperties extends InputHTMLAttributes<HTMLInputElement> {
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    error?: boolean;
    className?: string;
}


export default function Input({ value, onChange, error = false, className = '', ...props }: InputProperties) {
    return (
        <div className="relative w-full">
            { error && <RiCloseCircleFill className="absolute size-6 text-red-400 right-4 top-1/2 -translate-y-1/2" /> }
            <input value={ value } onChange={ onChange } className={ `border-2 w-full rounded-lg caret-active-bar p-2 h-12 text-sm shadow-lg ${ error ? "border-red-400 outline-red-400" : "border-input-border outline-active-bar" } ${ className }` } { ...props } />
        </div>
    );
}