import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

export interface SelectorClassNames {

}

export interface SelectorProperties {
    selectedValue: number;
    values: string[];
    onChange?: (value: string, i: number) => void;
    classNames?: SelectorClassNames;
}

export default function Selector({ selectedValue, values, onChange }: SelectorProperties) {

    const [selected, setSelected] = useState<number>(selectedValue);
    const [show, setShow] = useState<boolean>(false);

    const intl = useIntl();

    useEffect(() => {
        onChange?.(values[selected], selected);
        setShow(false);
    }, [selected]);

    return(
        <div className="relative">
            <button type="button" title={ `${ intl.formatMessage({ id: "select" }) }` } className="cursor-pointer" onClick={ () => setShow(!show)}>
                <div className="flex flex-row items-center justify-center">
                    {
                        values[selected]
                    }
                    <ChevronDown className="size-5" />
                </div>
            </button>
            <div onBlur={ () => setShow(false) } className={`absolute left-1/2 top-1/4 -translate-x-1/2 p-2 w-32 h-32 bg-brand shadow-2xl overflow-auto ${ !show && 'hidden' }`}>
                {
                    values.map((value, i) => {
                        return (
                            <li key={ `value_${i}` } onClick={ () => setSelected(i) } className="cursor-pointer hover:bg-brand-hover rounded-xs">
                                <p>
                                    {
                                        value
                                    }
                                </p>
                                <div className="border-t border-separator my-2"></div>
                            </li>
                        );
                    })
                }
            </div>
        </div>
    );
}