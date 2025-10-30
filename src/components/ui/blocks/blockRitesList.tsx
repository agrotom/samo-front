import {
    DndContext, 
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';

import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useEffect, useMemo, useState } from 'react';
import { ControllableHeader } from '@/components/ui/elements/text-header';

import { SortableCheckbox } from '@/components/ui/elements/checkbox';
import useRitesController from '@/components/controller/ritesController';
import type { SortableItem } from '@/util/sortable';
import type { RiteData } from '@/api/diary';

interface BlockRitesClassNames {
    container: string;
}

interface BlockRitesListProperties {
    classNames?: BlockRitesClassNames;
}

export default function BlockRitesList({ classNames }: BlockRitesListProperties) {
    const rites = useRitesController(state => state.rites);

    const modifyRite = useRitesController(state => state.modifyRite);
    const removeRite = useRitesController(state => state.removeRite);
    const setRites = useRitesController(state => state.setRites);
    const addEmptyRite = useRitesController(state => state.addEmptyRite);
    
    const [editable, setEditable] = useState<boolean>(false);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            }
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
            activationConstraint: {
                delay: 200,
                tolerance: 1,
            }
        })
    );

    function handleDragEnd(event: any) {
        const {active, over} = event;
        
        if (active.id !== over.id) {
            const oldIndex = rites.findIndex(rite => rite.id == active.id);
            const newIndex = rites.findIndex(rite => rite.id == over.id);

            var array = arrayMove(rites, oldIndex, newIndex).map((data, i) => (
                {
                    ...data,
                    sort_order: i + 1
                }
            ));
            
            setRites(array);
        }
    }

    return (
        <>
            <div className={`flex flex-col min-h-0 ${classNames?.container}`}>
                <ControllableHeader text='Утренние ритуалы' editable={editable} onAdd={ addEmptyRite } setEditable={setEditable}/>
                    <div className={`flex-1 my-10 relative overflow-y-scroll overflow-x-clip ${ editable && 'touch-none' }`}>
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={rites.map(rite => rite.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                {rites.map(rite => <SortableCheckbox onDelete={ () => { removeRite(rite.id)  } } disabled={!editable} className='mb-5' onChange={data => { console.log(`${data.value} and ${data.text}`); modifyRite(rite.id, { ...rite, completed: data.value, text: data.text });}} value={rite.completed} key={`rite-${rite.id}`} id={rite.id} initText={rite.text} />)}
                            </SortableContext>
                        </DndContext>
                    </div>

            </div>
        </>
    )
}