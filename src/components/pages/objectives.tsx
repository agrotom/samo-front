import TextHeader from "@/components/atoms/text-header";
import InlineEditableText from "@/components/atoms/editableDiv";
import { BsStarFill } from "react-icons/bs";
import BlockInput from "@/components/templates/blockInput";
import { useState } from "react";
import Sticker from "@/components/organisms/sticker";
import { CiCirclePlus } from "react-icons/ci";
import { textColors } from "@/util/colorUtils";
import useObjectivesController from "@/controller/objectivesController";
import { ObjectiveModal } from "@/components/organisms/objectiveModal";
import { useIntl } from "react-intl";

export default function Objectives() {

    const objectives = useObjectivesController((state) => state.objectives);
    const mission = useObjectivesController((state) => state.mission);

    const setMission = useObjectivesController((state) => state.setMission);
    const addEmptyObjective = useObjectivesController((state) => state.addEmptyObjective);
    const getFavorites = useObjectivesController((state) => state.getFavorites);
    const selectObjective = useObjectivesController((state) => state.selectObjective);

    const [openModal, setOpenModal] = useState<boolean>(false);

    const intl = useIntl();

    const createListByMonths = (col: number, startLimit: number, endLimit: number) => {
                                    return objectives.filter(goal => {
                                        var now = new Date();
                                        var end = new Date();
                                        now.setMonth(now.getMonth() + startLimit)
                                        end.setMonth(end.getMonth() + endLimit);

                                        return goal.deadLine >= now && goal.deadLine <= end;
                                    }).map((goal, i) => <Sticker key={ `sticker-${col}-${i}` } onClick={data => { selectObjective(data); setOpenModal(true); } } classNames={{container: `col-start-${col} mx-auto row-start-${i + 2}`}} loadedData={ goal } />)
                                }

    return ( 
        <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:p-6 h-full grid-rows-[auto_1fr]">
                <div className="relative bg-brand p-6 rounded-lg md:col-span-3 h-50 md:h-fit overflow-hidden">
                    <div className="flex-row items-center space-x-10 hidden md:flex">
                        <TextHeader text="mission" />
                        <InlineEditableText limit={100} initText={ mission } onChange={ text => setMission(text) } classNames={ { container: 'w-full overflow-x-hidden', input: 'text-nowrap w-full', span: 'w-full truncate whitespace-nowrap' } } />
                    </div>
                    <BlockInput header="mission" initText={ mission } onChange={ text => setMission(text) } classNames={{ block: "md:hidden" }} />
                </div>
                <div className="relative bg-brand p-6 rounded-lg overflow-hidden md:col-span-3 h-full">
                    <div className="lg:flex lg:flex-row lg:items-start md:h-full">
                        <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-1 text-center w-full h-full space-y-8 lg:space-y-0">
                                <div className="flex flex-col gap-4 h-100 md:h-full overflow-auto">
                                    <TextHeader text="two_month" />
                                    {
                                        createListByMonths(1, 0, 2)
                                    }
                                    <button type="button" title={ `${ intl.formatMessage({ id: "add" }) }` } className="col-start-1 mx-auto mb-auto cursor-pointer">
                                        <CiCirclePlus className="size-12" onClick={() => addEmptyObjective(1)}/>
                                    </button>
                                </div>
                                <div className="flex flex-col gap-4 h-100 md:h-full overflow-auto">
                                    <TextHeader text="six_month" />
                                    {
                                        createListByMonths(2, 2, 6)
                                    }
                                    <button type="button" title={ `${ intl.formatMessage({ id: "add" }) }` } className="col-start-2 mx-auto mb-auto cursor-pointer">
                                        <CiCirclePlus className="size-12" onClick={() => addEmptyObjective(5)}/>
                                    </button>
                                </div>
                                <div className="flex flex-col gap-4 h-100 md:h-full overflow-auto">
                                    <TextHeader text="one_year" />
                                    {
                                        createListByMonths(3, 6, 12)
                                    }
                                    <button type="button" title={ `${ intl.formatMessage({ id: "add" }) }` } className="col-start-3 mx-auto mb-auto cursor-pointer">
                                        <CiCirclePlus className="size-12" onClick={() => addEmptyObjective(11)}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                </div>
                <div className="relative bg-brand  p-6 rounded-lg row-start-2 md:col-start-4 h-fit overflow-hidden">
                    <TextHeader text="focused_objectives" />
                    <div className="flex flex-col pt-5 space-y-5">
                        {
                            getFavorites().map(data => {
                                return (
                                    <div key={ `focused-objective-${data.id}` } className="flex flex-row space-x-5 items-start">
                                        <BsStarFill className={`mt-0.5 min-h-5 min-w-5 size-5 ${textColors[data.balanceType?.color] ?? ''}`} />
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