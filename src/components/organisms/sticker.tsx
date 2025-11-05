import { BsStarFill } from "react-icons/bs";
import { BsStar } from "react-icons/bs";
import { HiClock } from "react-icons/hi2";
import Check from "@/assets/check.svg"
import { format } from "date-fns";
import type { ObjectiveData } from "@/api/objective";
import { backgroundColors, borderColors } from "@/util/colorUtils";
import { calculateCompleteness } from "@/util/objectives";


interface StickerClassNames {
    container?: string;
}

interface StickerProperties {
    loadedData: ObjectiveData;
    onClick?: (data: ObjectiveData) => void;
    classNames?: StickerClassNames;
}

export default function Sticker({ loadedData, classNames = { container: '' }, onClick }: StickerProperties) {
    return (
        <>
            <div onClick={ () => onClick?.(loadedData) } className={`flex flex-col w-full p-3 border-t-4 rounded-b-2xl ${borderColors[loadedData.balanceType.color]} ${backgroundColors[loadedData.balanceType.color]} cursor-pointer md:w-62 lg:w-64 ${classNames.container}`}>
                <div className='flex flex-row items-center'>
                    { loadedData.label }
                    <BsStarFill className={`ml-auto ${!loadedData.favorite && 'hidden'}`}></BsStarFill>
                    <BsStar className={`ml-auto ${loadedData.favorite && 'hidden'}`}></BsStar>
                </div>
                <div className='flex flex-row mt-5'>
                    <div className='flex flex-row w-fit rounded-md p-1.5 bg-white items-center justify-center'>
                        <HiClock className='size-5'/>
                        <p className='ml-2 text-center text-sm'>{format(loadedData.date, "dd.MM")}</p>
                    </div>
                    <div className='flex flex-row w-fit p-1.5 items-center justify-center ml-5'>
                        <img src={Check}/>
                        <p className='ml-2 text-sm'>{calculateCompleteness(loadedData) + '%'}</p>
                    </div>
                </div>
                {
                    loadedData.image_url &&
                    <div className="aspect-[16/9] overflow-hidden rounded-lg">
                        <img alt="sticker_image" className="mt-3.5 mx-auto rounded-lg w-full" src={ loadedData.image_url }/>
                    </div>
                }
            </div>
        </>
    )
}