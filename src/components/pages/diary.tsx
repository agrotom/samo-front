import { useEffect, useState, type JSX } from "react";
import Calendar from "@/components/molecules/calendar";
import BlockInput from "@/components/templates/blockInput";
import BlockRitesList from "@/components/templates/blockRitesList";
import { useLayout } from "@/provider/layoutProvider";
import BlockStar, { StarLabel } from "@/components/templates/blockStar";
import BlockHappy from "../templates/blockHappy";
import Modal from "@/components/templates/modal";
import TextHeader from "../atoms/text-header";
import useDiaryController from "@/controller/diaryController";
import useHappyBlockController from "@/controller/happyBlockController";
import useStarsController from "@/controller/starsController";
import { FormattedMessage, useIntl } from "react-intl";
import { useAuth } from "@/provider/authProvider";
import List from "../organisms/list";
import useListsController from "@/controller/listsController";
import { NoteImage, TrackerImage } from "../atoms/Sprite";

interface DiaryProperties {
    date: Date;
    disabled?: boolean;
    createCalendar: (date: Date) => JSX.Element;
}

export function DiaryLight({ date, disabled, createCalendar }: DiaryProperties) {

    const focusText = useDiaryController(state => state.focusText);
    const setFocusText = useDiaryController(state => state.setFocusText);

    const thanksText = useDiaryController(state => state.thanksText);
    const setThanksText = useDiaryController(state => state.setThanksText);

    const getFavorites = useListsController(state => state.getFavorites);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-1 md:gap-4 h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 md:row-span-2 md:col-span-2 gap-4">
                <div className="grid grid-rows-1 md:grid-cols-2 gap-4 w-full md:col-span-2">
                    <div className="grid grid-rows-[auto_1fr] grid-cols-1 gap-4 auto-rows-min">
                        {
                            createCalendar(date)
                        }
                        <div className="relative bg-brand md:col-start-1 p-6 rounded-lg w-full h-full min-h-0 overflow-hidden">
                            <BlockRitesList disabled={disabled} classNames={{ container: "h-full box-border" }} />

                        </div>
                    </div>
                    <div className="relative bg-brand md:col-start-2 md:row-start-1 p-6 rounded-lg h-64 md:h-full overflow-hidden">

                            <BlockInput name="focus" disabled={disabled} header="focus_block_header" initText={ focusText } onChange={ text => setFocusText(text) }/>
                    </div>
                </div>
                <div className="relative bg-brand p-6 rounded-lg md:row-start-2 md:row-span-2 md:col-span-2 h-64 md:h-full overflow-hidden">
                    <BlockInput disabled={disabled} classNames={{ container: "lg:pb-10" }} header="thanks" initText={ thanksText } onChange={ text => setThanksText(text) }
                        children={
                            <TrackerImage className="mx-[5%] my-auto size-48 hidden lg:block" />
                        }/>
                </div>

            </div>
            <div className="relative flex flex-col bg-brand  p-6 row-start-4 md:col-start-3 md:row-start-1 md:row-span-2 h-full w-full rounded-lg overflow-hidden">
                <List showBar={ false } allowEditing={ false } loadedData={ { id: -1, header: "Задачи", goals: getFavorites(), createdAt: new Date() } } />
            </div>
        </div>
    )
}

export function DiaryDark({ date, disabled = false, createCalendar }: DiaryProperties) {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const insightText = useDiaryController(state => state.insightText);

    const setInsightText = useDiaryController(state => state.setInsightText);
    
    const problemsText = useDiaryController(state => state.problemsText);
    const setProblemsText = useDiaryController(state => state.setProblemsText);

    const resultsText = useDiaryController(state => state.resultsText);
    const setResultsText = useDiaryController(state => state.setResultsText);

    const tomorrowMainTasksText = useDiaryController(state => state.tomorrowMainTasksText);
    
    const workHappiness = useHappyBlockController(state => state.workHappinessTracker);
    const selfHappiness = useHappyBlockController(state => state.selfHappinessTracker);

    const todayDeeds = useStarsController(state => state.todayDeeds)

    const { user } = useAuth();

    const intl = useIntl();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full grid-rows-1">
                <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-[auto_1fr_1fr] gap-4 h-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2 grid-rows-1 md:h-full">
                        {
                            createCalendar(date)
                        }
                        <div onClick={() => setOpenModal(!openModal)} className="flex bg-brand  lg:col-start-2 p-2 px-6 rounded-lg w-full h-fit cursor-pointer text-center justify-center items-center">
                            <button type="button" title={ `${ intl.formatMessage({ id: "send" }) }` } className="font-medium text-lg cursor-pointer">
                                <FormattedMessage id="send" />
                            </button>
                        </div>
                    </div>
                
                    <div className="relative bg-brand p-6 rounded-lg col-span-2 h-50 md:h-full overflow-hidden">
                        <BlockInput name="insight" disabled={disabled} header="insight_block_header" initText={ insightText } onChange={text => setInsightText(text)}/>
                    </div>
                    <div className="relative bg-brand p-6 rounded-lg col-span-2 h-50 md:h-full overflow-hidden">
                        <BlockInput name="problems" disabled={disabled} header="problems" initText={ problemsText } onChange={text => setProblemsText(text)}/>
                    </div>
                </div>

                <div className="grid grid-cols-1 row-start-2 gap-4 h-full">
                    <div className="relative bg-brand p-6 rounded-lg h-50 md:h-full overflow-hidden">
                        <BlockInput name="results" disabled={disabled} header="results" initText={ resultsText } onChange={text => setResultsText(text)} classNames={
                            {
                                container: "lg:mb-8"
                            }
                        }/>
                    </div>
                </div>

                <div className="relative bg-brand p-6 rounded-lg lg:col-start-2 h-full overflow-hidden">
                    <NoteImage className="absolute bottom-5 right-0 pointer-events-none hidden lg:block" />
                    <BlockStar disabled={disabled} />      
                </div>

                <div className="bg-brand p-6 px-8 rounded-lg lg:col-start-2 h-full">
                    <BlockHappy disabled={disabled} />
                </div>

                <Modal header="sending_header" submitText="send" open={openModal} setOpen={setOpenModal}>
                    <div className="flex flex-col space-y-4">
                        <div className="flex flex-row">
                            <TextHeader localization={ false } text={
                                user?.sureName + ' ' + user?.firstName
                            } className="wrap-break-word mr-5" />
                            <div className="flex flex-col ml-auto">
                                <div className="flex flex-row justify-between">
                                    <TextHeader text='work'/>
                                    <p className="font-bold text-lg">{ workHappiness }</p>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <TextHeader text='happy'/>
                                    <p className="font-bold text-lg ml-5">{ selfHappiness }</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <TextHeader text='insight_block_header'/>
                            <p className={ `whitespace-pre-line h-[75%] overflow-y-auto outline-0 w-full text-wrap break-all` }>
                                { insightText }
                            </p>
                        </div>
                        <div>
                            <TextHeader text='problems'/>
                            <p className={ `whitespace-pre-line h-[75%] overflow-y-auto outline-0 w-full text-wrap break-all` }>
                                { problemsText }
                            </p>
                        </div>
                        <div>
                            <TextHeader text='results'/>
                            <p className={ `whitespace-pre-line h-[75%] overflow-y-auto outline-0 w-full text-wrap break-all` }>
                                { resultsText }
                            </p>
                        </div>
                        <div>
                            <TextHeader text='today_deeds'/>
                            <div className="grid grid-cols-2 grid-rows-1 mt-2 auto-rows-min">
                                <p className="col-start-2 text-sm">Важность</p>
                            </div>
                            <div className="grid grid-cols-2 h-[73px] overflow-y-scroll mb-5">
                                {
                                    todayDeeds.map(data => <StarLabel key={ `todayDeeds-${data.id}` } readonly initText={ data.text } initLevel={ data.level } />)
                                }
                            </div>
                        </div>
                        <div>
                            <TextHeader text='tomorrow_main_deeds'/>
                            <p className={ `whitespace-pre-line h-[75%] overflow-y-auto outline-0 w-full text-wrap break-all` }>
                                { tomorrowMainTasksText }
                            </p>
                        </div>
                    </div>
                </Modal>


        </div>
    )
}

export default function Diary() {
    const layoutData = useLayout();

    const [disabled, setDisabled] = useState<boolean>(() => {
        return layoutData.diaryDate.toDateString() != new Date().toDateString();
    });

    useEffect(() => {
        setDisabled(layoutData.diaryDate.toDateString() != new Date().toDateString());
    }, [layoutData.diaryDate]);

    const createCalendar = (date: Date) => {
        return (
            <div className="bg-brand rounded-lg w-full h-fit p-2 px-6">
                    <Calendar onChange={ layoutData.setDiaryDate } currentDate={date}/>
            </div>
        );
    }

    return (
        <div className="h-full">
            {
                layoutData.isDaily ? 
                    <DiaryLight date={ layoutData.diaryDate } disabled={disabled} createCalendar={createCalendar} /> :
                    <DiaryDark date={ layoutData.diaryDate } disabled={disabled} createCalendar={createCalendar} />
            }
        </div>
    )
}