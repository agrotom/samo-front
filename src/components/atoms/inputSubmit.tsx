import { type FormEvent } from "react";
import { useIntl } from "react-intl";

interface InputSubmitProperties {
    id: string;
    text: string;
    onSubmit?: (event: FormEvent<HTMLInputElement>) => void;
    translated?: boolean;
    className?: string;
}

export default function InputSubmit({ id, text, onSubmit, translated = false, className = '', ...props }: InputSubmitProperties) {
    
    const intl = useIntl();
    
    return (
        <input type="submit" onSubmit={ onSubmit } id={ id } className={ `bg-button hover:bg-button-hover cursor-pointer rounded-lg h-10 text-sm text-white ${ className }` } { ...props } value={ translated ? intl.formatMessage({ id: text }) : text } />
    );
}