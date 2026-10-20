import { useState } from "react";
import { ControllableHeader } from "../atoms/text-header";
import type { ListData } from "@/api/lists";
import Bar from "../atoms/bar";
import { FormattedMessage, useIntl } from "react-intl";
import { SortableCheckbox } from "../atoms/checkbox";
import useListsController from "@/controller/listsController";
import StarButton from "../atoms/star";

export interface ListClassNames {
    container?: string;
}

export interface ListProperties {
    loadedData: ListData;
    showBar?: boolean;
    allowEditing?: boolean;
    classNames?: ListClassNames;
}

export default function List({ loadedData, showBar = true, allowEditing = true, classNames }: ListProperties) {
    const [editable, setEditable] = useState<boolean>(false);

    const [showCompleted, setShowCompleted] = useState<boolean>(false);

    const addEmptyListGoal = useListsController(state => state.addEmptyListGoal);
    const removeList = useListsController(state => state.removeList);
    const modifyListGoal = useListsController(state => state.modifyListGoal);
    const removeListGoal = useListsController(state => state.removeListGoal);
    const modifyList = useListsController(state => state.modifyList);

    const getCompleted = () => loadedData.goals.filter(goal => goal.completed).length;
    const getAll = () => loadedData.goals.length;

    const intl = useIntl();

    const calcCompleteness = () => {
        var completed = getCompleted();
        var all = getAll();

        if (all == 0) {
            return 100;
        }

        return completed / all * 100;
    }

    return (
        <div className={ `flex flex-col bg-brand rounded-xl space-y-2 h-full px-4 py-6 ${ classNames?.container }` }>
            <ControllableHeader disabled={ !allowEditing } editable={ editable } setEditable={ setEditable } onChange={ value => modifyList(loadedData.id, { ...loadedData, header: value }) } onAdd={ () => { addEmptyListGoal(loadedData.id)} } onDelete={ () => removeList(loadedData.id) }
                allowHeaderEdit={ true } text={ loadedData.header } />
            {
                showBar &&
                <>
                    <p className="font-bold">{ `${ getCompleted() }/${ getAll() }` }</p>
                    <Bar percentage={ calcCompleteness() }  />
                </>
            }
            <div className="overflow-y-auto space-y-5 py-5">
                {
                    loadedData.goals.sort((a, b) => a.createdAt.getDate() - b.createdAt.getDate()).filter(goal => goal.completed || !showCompleted).map(goal => {
                        return (
                            <div key={ goal.id } className="flex flex-row items-center">
                                <SortableCheckbox id={ goal.id } initText={ goal.text } value={ goal.completed }
                                    allowEditing={ !editable } onChange={ e => modifyListGoal(loadedData.id, goal.id, { ...goal, completed: e.value, text: e.text }) } onDelete={ () => removeListGoal(loadedData.id, goal.id) } />
                                {
                                    allowEditing &&
                                    <StarButton classNames={ { container: `ml-auto ${ editable && 'hidden' }` } } value={ goal.favorite } onChange={ value => modifyListGoal(loadedData.id, goal.id, { ...goal, favorite: value }) } />
                                }
                            </div>
                        );
                    })
                }
            </div>
            <button type="button" title={ `${ intl.formatMessage({ id: showCompleted ? 'show_all_goals' : 'show_completed_goals' }) }` } onClick={ () => setShowCompleted(!showCompleted) } className='z-10 mx-auto mt-auto cursor-pointer border-2 rounded-lg p-5 text-active-bar font-medium border-active-bar bg-white hover:bg-brand-active'>
                <FormattedMessage id={ showCompleted ? 'show_all_goals' : 'show_completed_goals' } />
            </button>
        </div>
    );

}