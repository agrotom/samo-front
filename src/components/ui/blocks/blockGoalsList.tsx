
// TODO


import { getGoals, type GoalData } from '@/api/goals';
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
import { useState } from 'react';
import TextHeader from '@/components/ui/elements/text-header';

import { GoPlus } from "react-icons/go";
import { SortableCheckbox } from '@/components/ui/elements/checkbox';

interface GoalsListProperties {
    onSave?: (data: GoalData[]) => void;
}

export default function BlockGoalsList(_: GoalsListProperties) {
    const [goals, setGoals] = useState<GoalData[]>(getGoals());
    
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: any) {
        const {active, over} = event;
        
        if (active.id !== over.id) {
            setGoals(goals => {
                const oldIndex = goals.findIndex(goal => goal.id == active.id);
                const newIndex = goals.findIndex(goal => goal.id == over.id);
                
                return arrayMove(goals, oldIndex, newIndex);
            });
        }
    }

    return (
        <>
            <div className='mb-5'>
                <div className="flex">
                    <TextHeader text='Задачи' className="mb-10"/>
                    <button className="ml-auto mb-auto cursor-pointer">
                        <GoPlus className="size-7"/>
                    </button>
                </div>
                <div className='overflow-y-auto overflow-x-clip lg:max-h-[460px]'>
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={goals}
                            strategy={verticalListSortingStrategy}
                        >
                            {goals.map(goal => <SortableCheckbox className='mb-5' value={goal.completed} key={goal.id} id={goal.id} initText={goal.text} />)}
                        </SortableContext>
                    </DndContext>
                </div>
            </div>
            <button className='z-10 mx-auto mt-auto cursor-pointer border-2 rounded-lg p-5 text-active-bar font-medium border-active-bar hover:bg-brand-active'>
                Показать завершённые
            </button>
        </>
    )
}