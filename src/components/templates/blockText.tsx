import { useState } from "react";
import TextHeader from "@/components/atoms/text-header";

interface BlockTextClassNames {
    headerDiv: string;
    textDiv: string;
    paragraph: string;
}

interface BlockTextProperties {
    header: string;
    initText: string;
    classNames?: BlockTextClassNames;
}

export default function BlockText({ header, initText, classNames }: BlockTextProperties) {
    const [editable] = useState<boolean>(false);
    const [text] = useState<string>(initText);

    return (
        <>
            <div className={`flex flex-row items-center ${classNames?.headerDiv}`}>
                <TextHeader text={ header }/>
            </div>
            {
                <div className={`flex flex-row relative overflow-hidden h-full mt-5 ${ classNames?.textDiv }`}>
                    <p className={ `whitespace-pre-line h-[75%] overflow-y-auto outline-0 w-full text-wrap break-all pr-5 ${editable && 'hidden'} ${ classNames?.paragraph }` }>
                        { text }
                    </p>
                </div>
            }
        </>
    )
}