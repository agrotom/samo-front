import { useState } from "react";
import Calendar from "@/components/ui/elements/calendar";
import BlockGoalsList from "@/components/ui/blocks/blockGoalsList";
import BlockInput from "@/components/ui/blocks/blockInput";
import BlockRitesList from "@/components/ui/blocks/blockRitesList";
import tracker_image from '@/assets/tracker_image.svg'
import { useLayout } from "@/components/provider/layoutProvider";
import { getFocus, getInsight, getProblems, getResults, getRites, getSelfHappines, getThanks, getTodayDeeds, getTomorrowMainTasks, getWorkHappines, saveFocus, saveInsight, saveProblems, saveResults, saveRites, saveThanks, saveTodayDeeds } from "@/api/diary";
import BlockStar, { StarLabel } from "@/components/ui/blocks/blockStar";
import BlockHappy from "../blocks/blockHappy";
import DiaryResultModal from "../unused/diaryResultModal";
import TextHeader from "../elements/text-header";
import { getUserInfo } from "@/api/auth";
import NoteImage from "@/assets/note.svg";
import BottomImage from "@/assets/bottom_image_left.svg";
import CornerImage from "@/assets/corner_image.svg";

export default function Diary() {
    const [date, setDate] = useState<Date>(new Date())
    const layoutData = useLayout();

    const [openModal, setOpenModal] = useState<boolean>(false); //
    const createCalendar = () => {
        return (
            <div className="bg-brand dark:bg-brand-dark rounded-lg w-full h-fit p-2 px-6">
                <Calendar ref={setDate} currentDate={date}/> 
            </div>
        );
    }

    return (
        <div className="h-full">
            {
            layoutData.isDaily ? 
            (
                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-1 md:gap-4 h-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 md:row-span-2 md:col-span-2 gap-4">
                        <div className="grid grid-rows-1 md:grid-cols-2 gap-4 w-full md:col-span-2">
                            <div className="grid grid-rows-[auto_1fr] grid-cols-1 gap-4 auto-rows-min">
                                {
                                    createCalendar()
                                }
                                <div className="relative bg-brand dark:bg-brand-dark md:col-start-1 p-6 rounded-lg w-full h-full min-h-0 overflow-hidden">
                                    <img src={CornerImage} className="absolute rotate-y-180 top-0 -left-3 w-full pointer-events-none hidden lg:block" />
                                    <BlockRitesList className="h-full box-border" loadedData={getRites()} onSave={ data => saveRites(new Date(), data) }/>

                                </div>
                            </div>
                            <div className="relative bg-brand dark:bg-brand-dark md:col-start-2 md:row-start-1 p-6 rounded-lg h-full overflow-hidden">
                                <BlockInput header="Фокус дня" loadedData={getFocus()} onSave={ text => saveFocus(new Date(), text) }/>
                            </div>
                        </div>
                        <div className="relative bg-brand dark:bg-brand-dark p-6 rounded-lg md:row-start-2 md:row-span-2 md:col-span-2 h-full overflow-hidden">
                            <img src={BottomImage} className="absolute w-full left-0 -bottom-5 pointer-events-none hidden lg:block" />
                            <BlockInput header="Я благодарю за то, что..." loadedData={getThanks()} onSave={ text => saveThanks(new Date(), text) }
                                children={
                                    <img className="mx-auto ml-10 my-auto mr-15 size-48" src={tracker_image}/>
                                }/>
                        </div>

                    </div>
                    <div className="relative flex flex-col bg-brand dark:bg-brand-dark p-6 row-start-4 md:col-start-3 md:row-start-1 md:row-span-2 h-full w-full rounded-lg overflow-hidden">
                        <img src={BottomImage} className="absolute rotate-y-180 left-0 bottom-0 pointer-events-none hidden lg:block" />
                        <BlockGoalsList/>
                    </div>
                </div>
            )
            :
            (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2 grid-rows-1 lg:h-0">
                                {
                                    createCalendar()
                                }
                                <div className="flex bg-brand dark:bg-brand-dark lg:col-start-2 p-2 px-6 rounded-lg w-full h-fit cursor-pointer text-center justify-center items-center">
                                    <button className="font-medium text-lg cursor-pointer" onClick={() => setOpenModal(!openModal)}>
                                        Отправить
                                    </button>
                                </div>
                            </div>
                        
                            <div className="relative bg-brand dark:bg-brand-dark p-6 rounded-lg col-span-2 h-50 md:h-full overflow-hidden">
                                <img src={CornerImage} className="absolute rotate-y-180 -top-2 -left-5 w-full pointer-events-none hidden lg:block" />
                                <BlockInput header="Инсайт дня" loadedData={getInsight()} onSave={text => saveInsight(new Date(), text)}/>
                            </div>
                            <div className="relative bg-brand dark:bg-brand-dark p-6 rounded-lg col-span-2 h-50 md:h-full overflow-hidden">
                                <BlockInput header="Проблемы" loadedData={getProblems()} onSave={text => saveProblems(new Date(), text)}/>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 row-start-2 gap-4 h-full">
                            <div className="relative bg-brand dark:bg-brand-dark p-6 rounded-lg h-50 md:h-full overflow-hidden">
                                <img src={BottomImage} className="absolute rotate-y-180 left-0 bottom-0 pointer-events-none hidden lg:block" />
                                <BlockInput header="Выводы" loadedData={getResults()} onSave={text => saveResults(new Date(), text)} classNames={
                                    {
                                        container: "lg:mb-8"
                                    }
                                }/>
                            </div>
                        </div>

                        <div className="relative bg-brand dark:bg-brand-dark p-6 rounded-lg lg:col-start-2 h-100 overflow-hidden">
                            <img className="absolute right-25 top-40 pointer-events-none hidden lg:block" src={NoteImage}/>
                            <BlockStar header="Что было сегодня сделано" loadedData={getTodayDeeds()} onSave={data => saveTodayDeeds(data)}/>
                            
                        </div>

                        <div className="bg-brand dark:bg-brand-dark p-6 px-8 rounded-lg lg:col-start-2 h-84">
                            <BlockHappy/>
                        </div>

                        <DiaryResultModal header="Отправка" open={openModal} setOpen={setOpenModal}>
                            <div className="flex flex-col space-y-1">
                                <div className="flex flex-row">
                                    <TextHeader text={
                                        getUserInfo().sureName + ' ' + getUserInfo().firstName
                                    } />
                                    <div className="flex flex-col ml-auto">
                                        <div className="flex flex-row justify-between">
                                            <TextHeader text='Работа:'/>
                                            <p className="font-bold text-lg">{getWorkHappines().currentStep - 1}</p>
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <TextHeader text='Счастье:'/>
                                            <p className="font-bold text-lg ml-5">{getSelfHappines().currentStep - 1}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <TextHeader text='Инсайт дня'/>
                                    <p className={ `block box-border whitespace-pre-line h-10 overflow-y-visible w-full text-wrap min-h-0 break-all` }>
                                        { getInsight() }
                                    </p>
                                </div>
                                <div>
                                    <TextHeader text='Проблемы'/>
                                    <p className={ `block box-border whitespace-pre-line h-10 overflow-y-visible w-full text-wrap min-h-0 break-all` }>
                                        { getProblems() }
                                    </p>
                                </div>
                                <div>
                                    <TextHeader text='Выводы'/>
                                    <p className={ `block box-border whitespace-pre-line h-10 overflow-y-visible w-full text-wrap min-h-0 break-all` }>
                                        { getResults() }
                                    </p>
                                </div>
                                <div>
                                    <TextHeader text='Что было сделано сегодня'/>
                                    <div className="grid grid-cols-2 grid-rows-1 mt-2 auto-rows-min">
                                        <p className="col-start-2 text-sm -ml-1.5">Важность</p>
                                    </div>
                                    <div className="grid grid-cols-2 h-[73px] overflow-y-scroll mb-5">
                                        {
                                            getTodayDeeds().map(data => <StarLabel initLevel={data.level} initText={data.text} readonly />)
                                        }
                                    </div>
                                </div>
                                <div>
                                    <TextHeader text='Главные задачи на завтра'/>
                                    <p className={ `block box-border whitespace-pre-line h-10 overflow-y-visible w-full text-wrap min-h-0 break-all` }>
                                        { getTomorrowMainTasks() }
                                    </p>
                                </div>
                            </div>
                        </DiaryResultModal>


                </div>
            )
        }
        </div>
    )
}