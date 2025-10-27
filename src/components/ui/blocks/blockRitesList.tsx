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
import { useEffect, useState } from 'react';
import { ControllableHeader } from '@/components/ui/elements/text-header';

import { SortableCheckbox } from '@/components/ui/elements/checkbox';
import { getRites, saveRites, type RiteData } from '@/api/diary';
import type { SortableItem } from '@/util/sortable';

interface RitesListProperties {
    className?: string;
}

export default function BlockRitesList({ className = '' }: RitesListProperties) {
    const [rites, setRites] = useState<SortableItem<RiteData>[]>(getRites().sort((a, b) => a.sort_order - b.sort_order).map((rite, i) => { return { id: i, content: rite }; }).slice(0, 10));
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

    useEffect(() => {
        saveRites(rites.map<RiteData>(rite => rite.content));
    }, [rites]);

    function handleDragEnd(event: any) {
        const {active, over} = event;
        
        if (active.id !== over.id) {
            setRites(goals => {
                const oldIndex = goals.findIndex(rite => rite.id == active.id);
                const newIndex = goals.findIndex(rite => rite.id == over.id);
                
                return arrayMove(goals, oldIndex, newIndex).map((item, index) => (
                    {
                        ...item,
                        sort_order: 1 + index
                    }
                ));
            });
        }
    }

    return (
        <>
            <div className={`flex flex-col min-h-0 ${className}`}>
                <ControllableHeader text='Утренние ритуалы' editable={editable} setEditable={setEditable}/>
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
                                {rites.map(rite => <SortableCheckbox disabled={!editable} className='mb-5' onChange={data => { rite.content.completed = data.value; rite.content.text = data.text; saveRites(rites.map(rite => rite.content));}} value={rite.content.completed} key={rite.id} id={rite.id} initText={rite.content.text} />)}
                            </SortableContext>
                        </DndContext>
                    </div>

            </div>
        </>
    )
}

/*
                <div className='flex-1 pt-5 pb-5 min-h-0'>

                </div>
*/