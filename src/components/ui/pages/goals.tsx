import TextHeader from "@/components/ui/elements/text-header";
import InlineEditableText from "../elements/editableDiv";
import { EMPTY_OBJECTIVE, getAllObjectives, getFocusedObjectives, getMission, saveMission, type ObjectiveData } from "@/api/objective";
import { BsStarFill } from "react-icons/bs";
import { BsStar } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { AiOutlinePaperClip } from "react-icons/ai";
import { MdOutlineSegment } from "react-icons/md";
import { HiClock } from "react-icons/hi2";
import Check from "@/assets/check.svg"
import BlockInput from "../blocks/blockInput";
import { useEffect, useState } from "react";
import Sticker from "../elements/sticker";
import { CiCirclePlus } from "react-icons/ci";
import DiaryResultModal from "../unused/diaryResultModal";
import sticker_image from "@/assets/sticker_image.jpg"
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { backgroundColors, backgroundColorsContrast, textColors } from "@/util/colorUtils";
import { ChevronRight } from "lucide-react";

export default function Goals() {

    const [goals, setGoals] = useState<ObjectiveData[]>(getAllObjectives());

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [currentObjective, setCurrentObjective] = useState<ObjectiveData>(EMPTY_OBJECTIVE);
    
    const [editable, setEditable] = useState<boolean>(false);

    const [uploadedImage, setUploadedImage] = useState<File | undefined>();

    useEffect(() => {
        console.log(uploadedImage);
    }, [uploadedImage]);

    const createListByMonths = (col: number, startLimit: number, endLimit: number) => {
                                    return goals.filter(goal => {
                                        var now = new Date();
                                        var end = new Date();
                                        now.setMonth(now.getMonth() + startLimit)
                                        end.setMonth(end.getMonth() + endLimit);

                                        return goal.date >= now && goal.date <= end;
                                    }).map((goal, i) => <Sticker onClick={data => { setCurrentObjective(data); setOpenModal(true); } } classNames={{container: `col-start-${col} mx-auto row-start-${i + 2}`}} loadedData={ goal } />)
                                }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
                <div className="relative bg-brand dark:bg-brand-dark p-6 rounded-lg md:col-span-3 h-50 md:h-full overflow-hidden">
                    <div className="flex-row items-center space-x-10 hidden md:flex">
                        <TextHeader text="Миссия" />
                        <InlineEditableText initText={ getMission() } onChange={ text => saveMission(text) } classNames={ { container: 'w-full overflow-x-hidden', input: 'text-nowrap w-full', span: 'w-full truncate whitespace-nowrap' } } />
                    </div>
                    <BlockInput header="Миссия" loadedData={ getMission() } onSave={ text => saveMission(text) } classNames={{ block: "md:hidden" }} />
                </div>
                <div className="relative bg-brand dark:bg-brand-dark p-6 rounded-lg md:col-span-3 h-full overflow-hidden">
                    <div className="flex flex-row items-start">
                        <div className="grid md:grid-cols-3 text-center gap-8 w-full">
                            <TextHeader text="2 месяца" />
                            <TextHeader text="6 месяцев" />
                            <TextHeader text="1 год" />
                            {
                                createListByMonths(1, 0, 2)
                            }
                            {
                                createListByMonths(2, 2, 6)
                            }
                            {
                                createListByMonths(3, 6, 12)
                            }
                            <button className="col-start-1 mx-auto mb-auto cursor-pointer">
                                <CiCirclePlus className="size-12"/>
                            </button>
                            <button className="col-start-2 mx-auto mb-auto cursor-pointer">
                                <CiCirclePlus className="size-12"/>
                            </button>
                            <button className="col-start-3 mx-auto mb-auto cursor-pointer">
                                <CiCirclePlus className="size-12"/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="relative bg-brand dark:bg-brand-dark p-6 rounded-lg row-start-2 md:col-start-4 h-fit overflow-hidden">
                    <TextHeader text="Цели в фокусе" />
                    <div className="flex flex-col pt-5 space-y-5">
                        {
                            getFocusedObjectives().map(data => {
                                return (
                                    <div className="flex flex-row space-x-5 items-start">
                                        <BsStarFill className={`mt-0.5 min-h-5 min-w-5 size-5 ${textColors[data.balanceType.color]}`} />
                                        <p>{data.label}</p>
                                    </div>
                                );
                            })
                        }
                        
                    </div>
                </div>
            </div>
            <DiaryResultModal open={openModal} setOpen={setOpenModal} submitText='Сделано' cancelText='' >
                <div className="flex flex-col">
                    <div className="flex flex-row">
                        <TextHeader text={ `${ currentObjective?.label }` } />
                        <div className="flex flex-row ml-auto space-x-3">
                            <button className={ `ml-auto cursor-pointer ${ currentObjective?.favorite && 'hidden' }` }>
                                <BsStar/>
                            </button>
                            <button className={ `ml-auto cursor-pointer ${ !currentObjective?.favorite && 'hidden' }` }>
                                <BsStarFill/>
                            </button>
                            <button className='cursor-pointer' onClick={() => setEditable(!editable)}>
                                <MdOutlineEdit className='size-5'/>
                            </button>
                            <button className='cursor-pointer'>
                                <FaRegTrashAlt/>
                            </button>
                            <button className='cursor-pointer' onClick={() => setOpenModal(false)}>
                                <RxCross2 className='size-5' />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row pt-10 items-start space-x-2">
                        <button className='cursor-pointer'>
                            <AiOutlinePaperClip className='size-5' />
                        </button>
                        {
                            currentObjective?.image_url ?
                            <div className="aspect-[16/9] overflow-hidden rounded-lg">
                                <img alt="sticker_image" className="mx-auto rounded-lg w-full" src={ currentObjective.image_url }/>
                            </div> :
                            editable ?
                            <input type="file" accept="image/*" className="-mt-1" disabled={!editable} onChange={e => setUploadedImage(e.target.files?.[0])} />                       
                            :
                            <p className="-mt-1">
                                Нет картинки
                            </p>
                        } 
                    </div>
                    <div className="flex flex-row pt-5 items-start space-x-2">
                        <MdOutlineSegment className='size-5 rotate-z-180 rotate-x-180' />
                        <div className="-mt-0.5">
                            <p>
                                {currentObjective?.text}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row pt-5 items-start space-x-2">
                        <HiClock className='size-5' />
                        <div className="-mt-0.5">
                            <p>
                                { currentObjective && `${currentObjective.date.toLocaleDateString("ru-RU", { weekday: 'long' }).replace(/^./, (ch) => ch.toUpperCase())}, ${format(currentObjective.date, "d MMMM", {locale: ru})}` }
                            </p>
                        </div>
                    </div>
                    { /*TODO*/ }
                    <div className="flex flex-row pt-10 items-start space-x-2"> 
                        <img alt="check_image" src={Check} />
                        <div className="-mt-0.5">
                            <p>
                                Название
                            </p>
                        </div>
                    </div>

                    <div className="flex mt-15 hover:bg-brand-active h-10 items-center rounded-sm w-full cursor-pointer px-2">
                        <button className="flex flex-row w-full items-center cursor-pointer">
                            <div className={`size-5 rounded-md ${backgroundColorsContrast[currentObjective.balanceType.color]}`} />
                            <p className="ml-5">{`Сфера: ${currentObjective.balanceType.locale}`}</p>
                            <ChevronRight className="ml-auto" />
                        </button>
                    </div>
                    
                </div>
            </DiaryResultModal>
        </>
    );
}