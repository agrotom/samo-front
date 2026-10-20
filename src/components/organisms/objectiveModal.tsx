import type { ObjectiveGoalData } from "@/api/objective";
import useObjectivesController, { type RawObjectiveData } from "@/controller/objectivesController";
import { BalanceTypes, type Balance } from "@/common/balanceWheel";
import { useEffect, useRef, useState } from "react";
import Modal from "../templates/modal";
import { EditableTextHeader } from "../atoms/text-header";
import useDidUpdateEffect from "@/hooks/useDidUpdateEffect";
import { BsStar, BsStarFill } from "react-icons/bs";
import { FaCheck, FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineEdit, MdOutlineSegment } from "react-icons/md";
import { AiOutlinePaperClip } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { FormattedMessage, useIntl } from "react-intl";
import InlineEditableText from "../atoms/editableDiv";
import { HiClock } from "react-icons/hi2";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { GoPlus } from "react-icons/go";
import { SortableCheckbox } from "../atoms/checkbox";
import Calendar from "../molecules/calendar";
import { backgroundColorsContrast } from "@/util/colorUtils";
import { ChevronRight } from "lucide-react";
import { CheckIcon } from "../atoms/Icon";

interface ObjectiveGoalProperties {
    objectiveId: number;
    data: ObjectiveGoalData,
    editable: boolean;
    modifyObjectiveGoal: (objectiveId: number, goalId: number, data: ObjectiveGoalData) => void;
    removeObjectiveGoal: (objectiveId: number, goalId: number) => void;
}

export function ObjectiveGoal({ objectiveId, data, editable, modifyObjectiveGoal, removeObjectiveGoal } : ObjectiveGoalProperties) {
    
    const text = useRef<string>(data.text);
    const completed = useRef<boolean>(data.completed);

    const [deadline, setDeadline] = useState<Date>(data.deadLine);
    const [deadlineOpen, setDeadlineOpen] = useState<boolean>(false);

    const modify = (date: Date, text: string, completed: boolean) => {
        modifyObjectiveGoal(objectiveId, data.id, { ...data, deadLine: date, completed: completed, text: text })
    };

    return (
        <div key={`objectiveGoal-${data.id}`} className="flex flex-row">
            <SortableCheckbox id={data.id} initText={data.text} onDelete={ () => removeObjectiveGoal(objectiveId, data.id) } value={data.completed} allowEditing={!editable} onChange={(checkboxData) => { text.current = checkboxData.text; completed.current = checkboxData.value; modify(deadline, checkboxData.text, checkboxData.value); }} />
            <div className="flex flex-row ml-auto">
                <HiClock className='size-5' />
                <div className="-mt-0.5">
                    <p className={ `cursor-pointer` } onClick={ () => { setDeadlineOpen(true) } }>
                        { `${deadline.toLocaleDateString("ru-RU", { weekday: 'long' }).replace(/^./, (ch) => ch.toUpperCase())}, ${format(deadline, "d MMMM", {locale: ru})}` }
                    </p>
                </div>
            </div>
            <Calendar onChange={ date => { setDeadline(date); modify(date, text.current, completed.current); } } currentDate={ deadline } setOpen={ setDeadlineOpen } open={ deadlineOpen } />
        </div>
    )
}

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
    const modifyObjectiveGoal = useObjectivesController((state) => state.modifyObjectiveGoal);
    const removeObjectiveGoal = useObjectivesController((state) => state.removeObjectiveGoal);

    const [editable, setEditable] = useState<boolean>(false);
    const listRef = useRef<HTMLDivElement>(null);

    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [label, setLabel] = useState<string>(loadedData.label);
    const [favorite, setFavorite] = useState<boolean>(loadedData.favorite);
    const [text, setText] = useState<string>(loadedData.text);
    const [goalsLabel, setGoalsLabel] = useState<string>(loadedData.goalsLabel);
    const [balance, setBalance] = useState<Balance>(loadedData.balanceType);
    const [date, setDate] = useState<Date>(loadedData.deadLine);
    const [completed, setCompleted] = useState<boolean>(loadedData.completed);

    const [fileURL, setFileURL] = useState<string | null>(loadedData.image_url);

    const [deleteFile, setDeleteFile] = useState<boolean>(false);
    const [replaceFile, setReplaceFile] = useState<boolean>(false);

    const [goals, setGoals] = useState<ObjectiveGoalData[]>(loadedData.goals);

    const [showCalendar, setShowCalendar] = useState<boolean>(false);

    const [showenList, setShowenList] = useState<boolean>(false);

    const intl = useIntl();

    const gatherData = (): RawObjectiveData => {
        return { imageFile: uploadedImage, label: label, text: text, favorite: favorite, balanceType: balance, deadLine: date, completed: completed, goalsLabel: goalsLabel, goals: goals };
    }

    const calcGoalsPercent = (): string => {
        var allGoals = goals.length;
        var completedGoals = goals.filter(data => data.completed).length;

        if (allGoals == 0) {
            return "100";
        }

        return (completedGoals / allGoals * 100).toFixed(0);
    }

    useEffect(() => {
        setLabel(loadedData.label);
        setFavorite(loadedData.favorite);
        setText(loadedData.text);
        setDate(loadedData.deadLine);
        setCompleted(loadedData.completed);
        setGoalsLabel(loadedData.goalsLabel);
        setGoals(loadedData.goals);

        if (loadedData.balanceType === undefined) {
            console.warn("Unknown balance type for objective id " + loadedData.id);
            setBalance(BalanceTypes.lifeBrightness);
        }
        else {
            setBalance(loadedData.balanceType);
        }

        if (uploadedImage === null) {
            setFileURL(loadedData.image_url);
        }

        setReplaceFile(false);
        setDeleteFile(false);
    }, [loadedData])

    useEffect(() => {
        setReplaceFile(uploadedImage != null);

        if (uploadedImage != null) {
            const objectURL = URL.createObjectURL(uploadedImage);
            setFileURL(objectURL);
        }
    }, [uploadedImage]);

    useEffect(() => {
        if (deleteFile) {
            setFileURL(null);
        }
    }, [deleteFile]);

    useEffect(() => {
        if (showenList) {
            listRef.current?.focus();
        }
    }, [showenList]);

    useEffect(() => {
        if (!editable && openModal) {
            modifyObjective(loadedData.id, deleteFile || replaceFile, gatherData());
        }
    }, [editable]);

    useDidUpdateEffect(() => {
        modifyObjective(loadedData.id, deleteFile || replaceFile, gatherData());
    }, [balance, favorite, completed]);

    useEffect(() => {
        if (openModal) {
            setEditable(false);
            setShowenList(false);
        }
    }, [openModal]);

    return (
        <Modal open={openModal} setOpen={setOpenModal} onSubmit={ () => setCompleted(!completed) } submitText={ `${ completed ? 'not_done' : 'done' }` } cancelText='' >
            <div className="flex flex-col relative">
                <div className="flex flex-row">
                    <EditableTextHeader text={label} editable={editable} onChange={ setLabel } />
                    <div className="flex flex-row ml-auto space-x-3">
                        <button type="button" title={ `${ intl.formatMessage({ id: "favorite" }) }` } className={ `ml-auto cursor-pointer` } onClick={ () => {if (isAllowedFavorite() || favorite) setFavorite(!favorite) }}>
                            {
                                favorite ? <BsStarFill/> : <BsStar/>
                            }
                        </button>
                        <button type="button" title={ `${ intl.formatMessage({ id: "edit" }) }` } className='cursor-pointer' onClick={() => setEditable(!editable)}>
                            {
                                editable ?
                                <FaCheck className="text-active-bar  size-4 mx-1"/> :
                                <MdOutlineEdit className='size-5'/>
                            }
                        </button>
                        <button type="button" title={ `${ intl.formatMessage({ id: "delete" }) }` } className='cursor-pointer' onClick={ () => { setOpenModal(false); removeObjective(loadedData.id); } }>
                            <FaRegTrashAlt/>
                        </button>
                        <button type="button" title={ `${ intl.formatMessage({ id: "close" }) }` } className='cursor-pointer' onClick={() => setOpenModal(false)}>
                            <RxCross2 className='size-5' />
                        </button>
                    </div>
                </div>
                <div className="flex flex-row pt-10 items-start space-x-2">
                    {
                        editable ?
                        <button type="button" title={ `${ intl.formatMessage({ id: "delete" }) }` } className='cursor-pointer' onClick={ () => setDeleteFile(true) }>
                            <RxCross2 className='size-5' />
                        </button> :
                        <AiOutlinePaperClip className='size-5 shrink-0' />
                    }
                    {
                        editable ?
                            <input type="file" accept="image/*" className="-mt-1" disabled={!editable} onChange={e => setUploadedImage(e.target.files?.[0] ?? null)} />                       
                        :
                        (fileURL != null && !deleteFile) || replaceFile ? 
                        <div className="aspect-video overflow-hidden rounded-lg">
                            <img alt="sticker_image" className="mx-auto rounded-lg w-full" src={ fileURL ?? "" }/>
                        </div> :
                        <p className="-mt-1">
                            <FormattedMessage id="no_image" />
                        </p>
                    } 
                </div>
                <div className="flex flex-row pt-5 items-start space-x-2">
                    <MdOutlineSegment className='size-5 rotate-z-180 rotate-x-180 shrink-0' />
                    <div className="-mt-0.5 w-full pr-5">
                        <InlineEditableText wrap classNames={{ container: "w-full", span: "w-full wrap-text whitespace-pre-line" }} initText={ text } onChange={ newText => setText(newText) } />
                    </div>
                </div>
                <div className="flex flex-row pt-5 items-start space-x-2">
                    <HiClock className='size-5' />
                    <div className="-mt-0.5">
                        <p className={ `cursor-pointer` } onClick={ () => { setShowCalendar(true) } }>
                            { `${date.toLocaleDateString("ru-RU", { weekday: 'long' }).replace(/^./, (ch) => ch.toUpperCase())}, ${format(date, "d MMMM", {locale: ru})}` }
                        </p>
                    </div>
                </div>
                <div className="flex flex-row pt-10 items-start space-x-2"> 
                    <CheckIcon />
                    <div className="-mt-0.5">
                        <InlineEditableText initText={ goalsLabel } onChange={ setGoalsLabel } />
                    </div>
                </div>
                <div className="flex flex-row items-center space-x-2 pt-2"> 
                    <p className="text-sm items-center">
                        { `${calcGoalsPercent()}%` }
                    </p>
                    <div className="bg-inactive w-full h-2 my-auto rounded-lg">
                        <div style={{ width: `${ calcGoalsPercent() }%` }} className="bg-active-bar-alt h-2 my-auto rounded-lg" />
                    </div>
                    <button type="button" title={ `${ intl.formatMessage({ id: "sphere" }) }` } className="cursor-pointer" onClick={ () => addEmptyObjectiveGoal(loadedData.id) }>
                        <GoPlus className="size-5"/>
                    </button>
                </div>
                <div className="flex flex-col pl-5 pt-5 space-y-2">
                    {
                        loadedData.goals.map(data => <ObjectiveGoal key={ `objective_goal_${ data.id }` } objectiveId={loadedData.id} data={data} removeObjectiveGoal={removeObjectiveGoal} modifyObjectiveGoal={modifyObjectiveGoal} editable={editable} />)
                    }
                </div>

                <div onClick={ () => setShowenList(true) } className="flex mt-15 hover:bg-brand-active h-10 items-center rounded-sm w-full cursor-pointer px-2">
                    <button type="button" title={ `${ intl.formatMessage({ id: "sphere" }) }` } className="flex flex-row w-full items-center cursor-pointer">
                        <div className={`size-5 rounded-md ${backgroundColorsContrast[balance?.color] ?? ''}`} />
                        <p className="ml-5"><FormattedMessage id="sphere" />: <FormattedMessage id={balance?.id ?? 'unnamed'} /></p>
                        <ChevronRight className="ml-auto" />
                    </button>
                </div>
                
            </div>
            <div ref={listRef} onBlur={() => setShowenList(false)} className={ `absolute z-41 bottom-35 bg-brand shadow-lg h-fit rounded-md w-fit p-2 ${ !showenList && 'hidden' }` } >
                {
                    Object.entries(BalanceTypes).map(([i, balance]) => {
                        return (
                            <div key={ `balance_${i}` } className="flex flex-row">
                                <div onClick={() => { setBalance(balance); setShowenList(false); }} className="flex hover:bg-brand-active h-10 items-center rounded-sm w-full cursor-pointer px-2">
                                    <button type="button" title={ `${ intl.formatMessage({ id: balance.id }) }` } className="flex flex-row w-full items-center cursor-pointer">
                                        <div className={`size-5 rounded-md ${backgroundColorsContrast[balance.color]}`} />
                                        <p className="ml-5"><FormattedMessage id="sphere" />: <FormattedMessage id={ balance.id } /></p>
                                    </button>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <Calendar currentDate={date} open={showCalendar} setOpen={setShowCalendar} onChange={ date => setDate(date) } />
        </Modal>
    );
}