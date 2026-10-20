import Sticker from "@/components/organisms/sticker";

import BlockText from "@/components/templates/blockText";
import BlockTracker from "@/components/templates/blockTracker";
import { ObjectiveModal } from "@/components/organisms/objectiveModal";
import { useState } from "react";
import useObjectivesController from "@/controller/objectivesController";
import useDiaryController from "@/controller/diaryController";
import List from "../organisms/list";
import useListsController from "@/controller/listsController";

export default function Home() {

    const favoriteObjectives = useObjectivesController(state => state.objectives);
    const selectObjective = useObjectivesController(state => state.selectObjective);

    const focusText = useDiaryController(state => state.focusText);
    const insightText = useDiaryController(state => state.insightText);

    const [openModal, setOpenModal] = useState<boolean>(false);

    const getFavorites = useListsController(state => state.getFavorites);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-[1fr_1.5fr_1fr] h-full gap-4">
            <div className="relative bg-brand p-6 rounded-lg h-full overflow-hidden">
                <BlockText header={ "focus_block_header" } initText={ focusText } />
            </div>
            <div className="relative bg-brand p-6 rounded-lg h-full overflow-hidden">
                <BlockText header="insight_block_header" initText={ insightText } />
            </div>
            <div className="relative flex flex-col bg-brand p-3 md:row-span-3 h-full overflow-hidden rounded-lg">
                <List showBar={ false } allowEditing={ false } loadedData={ { id: -1, header: "Задачи", goals: getFavorites(), createdAt: new Date() } } />
            </div>
            <div className="relative bg-brand p-6 pb-10 rounded-lg md:col-span-2 md:col-start-1 items-start overflow-hidden">
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