import { useState } from "react";
import TextHeader from "@/components/ui/elements/text-header";


interface BlockTextProperties {
    header: string;
    loadedData: string;
}

export default function BlockText({ header, loadedData }: BlockTextProperties) {
    const [editable] = useState<boolean>(false);
    const [text] = useState<string>(loadedData);

    return (
        <>
            <div className="flex flex-row items-center">
                <TextHeader text={ header }/>
            </div>
            {
                <div className="flex flex-row relative overflow-hidden h-full mt-5 ">
                    <p className={ `whitespace-pre-line h-[75%] overflow-y-auto outline-0 w-full text-wrap break-all pr-5 ${editable && 'hidden'}` }>
                        { text }
                    </p>
                </div>
            }
        </>
    )
}