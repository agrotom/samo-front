import { FormattedMessage } from "react-intl";
import Input from "../atoms/input";

interface LabeledInputClassNames {
    container?: string;
    label?: string;
    input?: string;
}

interface LabeledInputProperties {
    label: string;
    id: string;
    placeholder?: string;
    translated?: boolean;
    classNames?: LabeledInputClassNames;
    text?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    error?: boolean;
}

export default function LabeledInput({ label, id, text, onChange, error = false, placeholder = '', translated = false, classNames }: LabeledInputProperties) {
    
    return (
        <div className={ `flex flex-col space-y-1 text-left ${ classNames?.container }` }>
            <label htmlFor={id} className={ `${ classNames?.label }` }>
                {
                    translated ? <FormattedMessage id={ label } /> : label
                }
            </label>
            <Input id={id} autoComplete="on" value={ text } onChange={ onChange } error={ error } placeholder={placeholder} className={`${classNames?.input}`} />
        </div>
    );
}