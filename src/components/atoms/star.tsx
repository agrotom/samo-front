import { useEffect, useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { useIntl } from "react-intl";

export interface StarButtonClassNames {
    container?: string;
}

export interface StarButtonProperties {
    value: boolean;
    classNames?: StarButtonClassNames;
    onChange?: (value: boolean) => void;
}

export default function StarButton({ value, classNames, onChange }: StarButtonProperties) {

    const [enabled, setEnabled] = useState<boolean>(value);

    useEffect(() => {
        onChange?.(enabled);
    }, [enabled]);

    return (
        <button type="button" title="" className={ `cursor-pointer ${ classNames?.container }` } onClick={ () => setEnabled(!enabled) }>
            {
                enabled ? <BsStarFill/> : <BsStar/>
            }
        </button>
    );
}