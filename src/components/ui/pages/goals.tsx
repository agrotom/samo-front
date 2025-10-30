import TextHeader from "@/components/ui/elements/text-header";
import InlineEditableText from "../elements/editableDiv";
import { BsStarFill } from "react-icons/bs";
import { BsStar } from "react-icons/bs";
import { FaCheck, FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { AiOutlinePaperClip } from "react-icons/ai";
import { MdOutlineSegment } from "react-icons/md";
import { HiClock } from "react-icons/hi2";
import Check from "@/assets/check.svg"
import BlockInput from "../blocks/blockInput";
import { useEffect, useRef, useState } from "react";
import Sticker from "../elements/sticker";
import { CiCirclePlus } from "react-icons/ci";
import Modal from "@/components/ui/elements/modal";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { backgroundColorsContrast, textColors } from "@/util/colorUtils";
import { ChevronRight } from "lucide-react";
import { BalanceTypes, type Balance } from "@/util/balanceWheel";
import Calendar from "../elements/calendar";
import useObjectivesController, { type RawObjectiveData } from "@/components/controller/objectivesController";
import useDidUpdateEffect from "@/util/useDidUpdateEffect";
import type { ObjectiveGoalData } from "@/api/objective";
import { GoPlus } from "react-icons/go";
import { reserveID } from "@/util/uniqueObject";
import { Checkbox, SortableCheckbox } from "../elements/checkbox";

interface ObjectiveModalProperties {
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
}

export function ObjectiveModal({ openModal, setOpenModal }: ObjectiveModalProperties) {

    const loadedData = useObjectivesController((state) => state.selectedObjective);
    const modifyObjective = useObjectivesController((state) => state.modifyObjective);
    const isAllowedFavorite = useObjectivesController((state) => state.isAllowedFavorite);
    const removeObjective = useObjectivesController((state) => state.removeObjective);
    const addEmptyObjectiveGoal = useObjectivesController((state) => state.addEmptyObjectiveGoal);

    const [editable, setEditable] = useState<boolean>(false);
    const listRef = useRef<HTMLDivElement>(null);

    const [uploadedImage, setUploadedImage] = useState<File | undefined>();
    const [label, setLabel] = useState<string>(loadedData.label);
    const [favorite, setFavorite] = useState<boolean>(loadedData.favorite);
    const [text, setText] = useState<string>(loadedData.text);
    const [goalsLabel, setGoalsLabel] = useState<string>(loadedData.goalsLabel);
    const [balance, setBalance] = useState<Balance>(loadedData.balanceType);
    const [date, setDate] = useState<Date>(loadedData.date);
    const [completed, setCompleted] = useState<boolean>(loadedData.completed);

    const [goals, setGoals] = useState<ObjectiveGoalData[]>(loadedData.goals);

    const [showCalendar, setShowCalendar] = useState<boolean>(false);

    const [showenList, setShowenList] = useState<boolean>(false);

    const gatherData = (): RawObjectiveData => {
        return { imageFile: uploadedImage, label: label, text: text, favorite: favorite, balanceType: balance, date: date, completed: completed, goalsLabel: goalsLabel, goals: [] };
    }

    const calcGoalsPercent = (): number => {
        var allGoals = goals.length;
        var completedGoals = goals.filter(data => data.completed).length;

        if (allGoals == 0) {
            return 100;
        }

        return completedGoals / allGoals;
    }

    useEffect(() => {
        setLabel(loadedData.label);
        setFavorite(loadedData.favorite);
        setText(loadedData.text);
        setBalance(loadedData.balanceType);
        setDate(loadedData.date);
        setCompleted(loadedData.completed);
        setGoalsLabel(loadedData.goalsLabel);
        setGoals(loadedData.goals);
    }, [loadedData])

    useEffect(() => {
        if (showenList) {
            listRef.current?.focus();
        }
    }, [showenList]);

    useEffect(() => {
        if (!editable && openModal) {
            modifyObjective(loadedData.id, gatherData());
        }
    }, [editable]);

    useDidUpdateEffect(() => {
        modifyObjective(loadedData.id, gatherData());
    }, [balance, favorite, completed]);

    useEffect(() => {
        if (openModal) {
            setEditable(false);
            setShowenList(false);
        }
    }, [openModal]);

    return (
        <Modal open={openModal} setOpen={setOpenModal} onSubmit={ () => setCompleted(!completed) } submitText={ `${ completed ? 'Не сделано' : 'Сделано' }` } cancelText='' >
            <div className="flex flex-col relative">
                <div className="flex flex-row">
                    <TextHeader text={ `${ label }` } />
                    <div className="flex flex-row ml-auto space-x-3">
                        <button className={ `ml-auto cursor-pointer` } onClick={ () => {if (isAllowedFavorite() || favorite) setFavorite(!favorite) }}>
                            {
                                favorite ? <BsStarFill/> : <BsStar/>
                            }
                        </button>
                        <button className='cursor-pointer' onClick={() => setEditable(!editable)}>
                            {
                                editable ?
                                <FaCheck className="text-active-bar dark:text-active-bar-dark size-4 mx-1"/> :
                                <MdOutlineEdit className='size-5'/>
                            }
                        </button>
                        <button className='cursor-pointer' onClick={ () => { setOpenModal(false); removeObjective(loadedData.id); } }>
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
                        loadedData.image_url ?
                        <div className="aspect-[16/9] overflow-hidden rounded-lg">
                            <img alt="sticker_image" className="mx-auto rounded-lg w-full" src={ loadedData.image_url }/>
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
                    <MdOutlineSegment className='size-5 rotate-z-180 rotate-x-180 shrink-0' />
                    <div className="-mt-0.5 w-full pr-5">
                        <InlineEditableText wrap classNames={{ container: "w-full", span: "w-full wrap-text whitespace-pre-line" }} initText={ text } onChange={ newText => setText(newText) } editingAllow={editable} />
                    </div>
                </div>
                <div className="flex flex-row pt-5 items-start space-x-2">
                    <HiClock className='size-5' />
                    <div className="-mt-0.5">
                        <p className={ `${editable && 'cursor-pointer'}` } onClick={ () => { if (editable) setShowCalendar(true) } }>
                            { `${date.toLocaleDateString("ru-RU", { weekday: 'long' }).replace(/^./, (ch) => ch.toUpperCase())}, ${format(date, "d MMMM", {locale: ru})}` }
                        </p>
                    </div>
                </div>
                <div className="flex flex-row pt-10 items-start space-x-2"> 
                    <img alt="check_image" src={Check} />
                    <div className="-mt-0.5">
                        <InlineEditableText initText={ goalsLabel } onChange={ setGoalsLabel } editingAllow={ editable } />
                    </div>
                </div>
                <div className="flex flex-row items-center space-x-2 pt-2"> 
                    <p className="text-sm items-center">
                        { `${calcGoalsPercent()}%` }
                    </p>
                    <div className="bg-inactive w-full h-2 my-auto rounded-lg">
                        <div style={{ width: `${ calcGoalsPercent() }%` }} className="bg-active-bar-dark h-2 my-auto rounded-lg" />
                    </div>
                    <button className="cursor-pointer" onClick={ () => addEmptyObjectiveGoal(loadedData.id) }>
                        <GoPlus className="size-5"/>
                    </button>
                </div>
                <div className="flex flex-col">
                    {
                        loadedData.goals.map(data => <SortableCheckbox id={data.id} />)
                    }
                </div>

                <div onClick={ () => setShowenList(true) } className="flex mt-15 hover:bg-brand-active h-10 items-center rounded-sm w-full cursor-pointer px-2">
                    <button className="flex flex-row w-full items-center cursor-pointer">
                        <div className={`size-5 rounded-md ${backgroundColorsContrast[balance.color]}`} />
                        <p className="ml-5">{`Сфера: ${balance.locale}`}</p>
                        <ChevronRight className="ml-auto" />
                    </button>
                </div>
                
            </div>
            <div ref={listRef} onBlur={() => setShowenList(false)} className={ `absolute z-[41] bottom-35 bg-brand shadow-lg h-fit rounded-md w-fit p-2 ${ !showenList && 'hidden' }` } >
                {
                    Object.entries(BalanceTypes).map(([_, balance]) => {
                        return (<div className="flex flex-row">
                            <div onClick={() => { setBalance(balance); setShowenList(false); }} className="flex hover:bg-brand-active h-10 items-center rounded-sm w-full cursor-pointer px-2">
                                <button className="flex flex-row w-full items-center cursor-pointer">
                                    <div className={`size-5 rounded-md ${backgroundColorsContrast[balance.color]}`} />
                                    <p className="ml-5">{`Сфера: ${balance.locale}`}</p>
                                </button>
                            </div>
                        </div>);
                    })
                }
            </div>
            <Calendar currentDate={date} open={showCalendar} setOpen={setShowCalendar} onChange={ date => setDate(date) } />
        </Modal>
    );
}

export default function Goals() {

    const objectives = useObjectivesController((state) => state.objectives);
    const mission = useObjectivesController((state) => state.mission);

    const setMission = useObjectivesController((state) => state.setMission);
    const addEmptyObjective = useObjectivesController((state) => state.addEmptyObjective);
    const getFavorites = useObjectivesController((state) => state.getFavorites);
    const selectObjective = useObjectivesController((state) => state.selectObjective);

    const [openModal, setOpenModal] = useState<boolean>(false);

    const createListByMonths = (col: number, startLimit: number, endLimit: number) => {
                                    return objectives.filter(goal => {
                                        var now = new Date();
                                        var end = new Date();
                                        now.setMonth(now.getMonth() + startLimit)
                                        end.setMonth(end.getMonth() + endLimit);

                                        return goal.date >= now && goal.date <= end;
                                    }).map((goal, i) => <Sticker key={ `sticker-${col}-${i}` } onClick={data => { selectObjective(data); setOpenModal(true); } } classNames={{container: `col-start-${col} mx-auto row-start-${i + 2}`}} loadedData={ goal } />)
                                }

    return ( 
        <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 h-full grid-rows-[auto_1fr]">
                <div className="relative bg-brand dark:bg-brand-dark p-6 rounded-lg md:col-span-3 h-50 md:h-fit overflow-hidden">
                    <div className="flex-row items-center space-x-10 hidden md:flex">
                        <TextHeader text="Миссия" />
                        <InlineEditableText limit={100} initText={ mission } onChange={ text => setMission(text) } classNames={ { container: 'w-full overflow-x-hidden', input: 'text-nowrap w-full', span: 'w-full truncate whitespace-nowrap' } } />
                    </div>
                    <BlockInput header="Миссия" initText={ mission } onChange={ text => setMission(text) } classNames={{ block: "md:hidden" }} />
                </div>
                <div className="relative bg-brand dark:bg-brand-dark p-6 rounded-lg overflow-hidden md:col-span-3 h-full">
                    <div className="flex flex-row items-start h-full overflow-auto">
                        <div className="grid grid-cols-3 grid-rows-1 text-center w-full">
                            <div className="flex flex-col gap-4">
                                <TextHeader text="2 месяца" />
                                {
                                    createListByMonths(1, 0, 2)
                                }
                                <button className="col-start-1 mx-auto mb-auto cursor-pointer">
                                    <CiCirclePlus className="size-12" onClick={() => addEmptyObjective(1)}/>
                                </button>
                            </div>
                            <div className="flex flex-col gap-4">
                                <TextHeader text="6 месяцев" />
                                {
                                    createListByMonths(2, 2, 6)
                                }
                                <button className="col-start-2 mx-auto mb-auto cursor-pointer">
                                    <CiCirclePlus className="size-12" onClick={() => addEmptyObjective(5)}/>
                                </button>
                            </div>
                            <div className="flex flex-col gap-4">
                                <TextHeader text="1 год" />
                                {
                                    createListByMonths(3, 6, 12)
                                }
                                <button className="col-start-3 mx-auto mb-auto cursor-pointer">
                                    <CiCirclePlus className="size-12" onClick={() => addEmptyObjective(11)}/>
                                </button>
                            </div>



                        </div>
                    </div>
                </div>
                <div className="relative bg-brand dark:bg-brand-dark p-6 rounded-lg row-start-2 md:col-start-4 h-fit overflow-hidden">
                    <TextHeader text="Цели в фокусе" />
                    <div className="flex flex-col pt-5 space-y-5">
                        {
                            getFavorites().map(data => {
                                return (
                                    <div key={ `focused-objective-${data.id}` } className="flex flex-row space-x-5 items-start">
                                        <BsStarFill className={`mt-0.5 min-h-5 min-w-5 size-5 ${textColors[data.balanceType.color]}`} />
                                        <p>{data.label}</p>
                                    </div>
                                );
                            })
                        }
                        
                    </div>
                </div>
            </div>
            <ObjectiveModal openModal={ openModal } setOpenModal={ setOpenModal } />
        </>
    );
}