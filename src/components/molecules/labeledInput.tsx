import { FormattedMessage } from "react-intl";
import Input from "../atoms/input";

interface LabeledInputClassNames {
    container?: string;
    label?: string;
    input?: string;
}

export interface LabeledInputProperties {
    label: string;
    maxLength?: number;
    id: string;
    disabled?: boolean;
    placeholder?: string;
    translated?: boolean;
    classNames?: LabeledInputClassNames;
    text?: string;
    onClick?: React.MouseEventHandler<HTMLInputElement>;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    error?: boolean;
}

export default function LabeledInput({ label, maxLength, id, text, onClick, onChange, disabled = false, error = false, placeholder = '', translated = false, classNames }: LabeledInputProperties) {
    
    return (
        <div onClick={ onClick } className={ `flex flex-col space-y-1 text-left ${ classNames?.container }` }>
            <label htmlFor={id} className={ `${ classNames?.label }` }>
                {
                    translated ? <FormattedMessage id={ label } /> : label
                }
            </label>
            <Input id={id} maxLength={maxLength} disabled={ disabled } autoComplete="on" value={ text } onChange={ onChange } error={ error } placeholder={placeholder} className={`${classNames?.input}`} />
        </div>
    );
}