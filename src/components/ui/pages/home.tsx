import Sticker from "@/components/ui/elements/sticker";

import { setTracker, getTrackers} from "@/api/trackers";

import BlockGoalsList from "@/components/ui/blocks/blockGoalsList";
import { getFocus, getInsight } from "@/api/diary";
import BlockText from "@/components/ui/blocks/blockText";
import BlockTracker from "@/components/ui/blocks/blockTracker";
import BottomImage from "@/assets/bottom_image_left.svg";
import CornerImage from "@/assets/corner_image.svg";
import { getFocusedObjectives } from "@/api/objective";

export default function Home() {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="relative bg-brand dark:bg-brand-dark p-6 rounded-lg h-50 overflow-hidden">
                <img src={CornerImage} className="absolute rotate-y-180 top-0 -left-3 w-full pointer-events-none hidden lg:block" />
                <BlockText header="Фокус" loadedData={ getFocus() } />
            </div>
            <div className="relative bg-brand dark:bg-brand-dark p-6 rounded-lg h-50 overflow-hidden">
                <BlockText header="Инсайт" loadedData={ getInsight() } />
            </div>
            <div className="relative flex flex-col bg-brand dark:bg-brand-dark p-6 md:row-span-3 h-full overflow-hidden rounded-lg">
                <img src={BottomImage} className="absolute rotate-y-180 left-0 bottom-0 pointer-events-none hidden lg:block" />
                <BlockGoalsList/>
            </div>
            <div className="relative bg-brand dark:bg-brand-dark p-6 rounded-lg md:col-span-2 md:col-start-1 overflow-hidden h-100 md:h-fit">
                <img src={BottomImage} className="absolute rotate-y-180 left-0 -bottom-10 pointer-events-none hidden lg:block" />
                <BlockTracker loadedData={ getTrackers() } onSave={ data => setTracker(data) } />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-30 md:col-span-2">
                {
                    getFocusedObjectives().map(data => <Sticker loadedData={ data } />)
                }
            </div>
        </div>
    )
}
//<Modal forms={[{ id: '1', label: 'Текст' }]} header="Создать задачу" children={<>Введите текст задачи</>} onCancel={ () => console.log("Cancel") } onSubmit={ (data) => console.log(data) } open={() => open} setOpen={setOpen}/>