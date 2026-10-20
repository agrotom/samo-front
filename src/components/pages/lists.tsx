import List from "@/components/organisms/list";
import useListsController from "@/controller/listsController";

import { IoIosAddCircleOutline } from "react-icons/io";
import { useIntl } from "react-intl";

export default function Lists() {

    const lists = useListsController(state => state.lists);

    const addEmptyList = useListsController(state => state.addEmptyList);

    const intl = useIntl();

    return (
            <div className="flex flex-row space-x-8 h-full overflow-auto snap-x snap-mandatory md:snap-none">
                {
                    lists.map(list => <List key={ `list_${ list.id }` } classNames={ { container: "snap-start shrink-0 w-full md:w-72" } } loadedData={ list } />)
                }
                <button type="button" title={ `${ intl.formatMessage({ id: "add" }) }` } className="cursor-pointer" onClick={ addEmptyList }>
                    <IoIosAddCircleOutline className="size-10" />
                </button>
            </div>
    );
}