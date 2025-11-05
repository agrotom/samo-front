import Sticker from "@/components/organisms/sticker";

import BlockGoalsList from "@/components/templates/blockGoalsList";
import BlockText from "@/components/templates/blockText";
import BlockTracker from "@/components/templates/blockTracker";
import BottomImage from "@/assets/bottom_image_left.svg";
import CornerImage from "@/assets/corner_image.svg";
import { ObjectiveModal } from "./goals";
import { useState } from "react";
import useObjectivesController from "@/controller/objectivesController";
import useDiaryController from "@/controller/diaryController";
import { useIntl } from "react-intl";

export default function Home() {

    const favoriteObjectives = useObjectivesController(state => state.objectives);
    const selectObjective = useObjectivesController(state => state.selectObjective);

    const focusText = useDiaryController(state => state.focusText);
    const insightText = useDiaryController(state => state.insightText);

    const [openModal, setOpenModal] = useState<boolean>(false);

    const intl = useIntl();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-[auto_1fr_0.5fr] gap-4">
            <div className="relative bg-brand p-6 rounded-lg h-50 overflow-hidden">
                <img src={CornerImage} className="absolute rotate-y-180 top-0 -left-3 w-full pointer-events-none hidden lg:block" />
                <BlockText header={ "focus_block_header" } initText={ focusText } />
            </div>
            <div className="relative bg-brand p-6 rounded-lg h-50 overflow-hidden">
                <BlockText header="insight_block_header" initText={ insightText } />
            </div>
            <div className="relative flex flex-col bg-brand p-6 md:row-span-3 h-full overflow-hidden rounded-lg">
                <img src={BottomImage} className="absolute rotate-y-180 left-0 bottom-0 pointer-events-none hidden lg:block" />
                <BlockGoalsList />
            </div>
            <div className="relative bg-brand p-6 pb-10 rounded-lg md:col-span-2 md:col-start-1 items-start overflow-hidden h-100 md:h-fit">
                <img src={BottomImage} className="absolute rotate-y-180 left-0 -bottom-10 pointer-events-none hidden lg:block" />
                <BlockTracker />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-30 md:col-span-2">
                {
                    favoriteObjectives.filter(data => data.favorite).map((data, i) => <Sticker onClick={ data => { selectObjective(data); setOpenModal(true); } } key={`sticker-${data.id}`} classNames={{ container: `${i > 1 && 'md:hidden'} lg:block` }} loadedData={ data } />)
                }
            </div>
            <ObjectiveModal openModal={ openModal } setOpenModal={ setOpenModal } />
        </div>
    )
}