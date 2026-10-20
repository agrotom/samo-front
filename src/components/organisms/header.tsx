import { BsList } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";

import example from "./example.jpg"
import { useLayout } from "@/provider/layoutProvider";
import { FormattedMessage, useIntl } from "react-intl";
import { useAuth } from "@/provider/authProvider";

interface HeaderProperties {
    isExpanded: () => boolean;
    setIsExtended: (value: boolean) => void;
}

function Header({ isExpanded, setIsExtended }: HeaderProperties) {
    const toggle = () => setIsExtended(!isExpanded());

    const { user } = useAuth();

    const intl = useIntl();

    const layoutData = useLayout();

    return (
        <>
            <header className="flex justify-center bg-brand fixed top-0 left-0 w-full h-15 drop-shadow-md z-40">
                <nav aria-label="Global" className="flex items-center justify-center px-10 w-full">
                    <div className={`flex lg:hidden`}>
                        <button type="button" title={ `${ intl.formatMessage({ id: "menu" }) }` } onClick={ toggle } className="cursor-pointer">
                            <BsList className="size-6"/>
                        </button>
                    </div>
                    <div className="font-bold text-2xl flex-1/3 items-center justify-center text-center hidden md:flex">
                        <FormattedMessage id={ layoutData.currentPage } />
                    </div>
                    {
                        layoutData.currentPage === 'diary' &&
                        <div className="flex-1/6 text-lg hidden lg:flex">
                            {
                                <>
                                    <button type="button" title={ `${ intl.formatMessage({ id: "morning_record" }) }` } onClick={ () => { layoutData.setIsDaily(true); } } className={`px-2 cursor-pointer ${layoutData.isDaily ? "border-b-4 border-active-bar-alt font-bold" : ''}`}><FormattedMessage id="morning_record" /></button>
                                    <button type="button" title={ `${ intl.formatMessage({ id: "afternoon_record" }) }` } onClick={ () => { layoutData.setIsDaily(false); } } className={`px-2 cursor-pointer ml-5 ${!layoutData.isDaily ? "border-b-4 border-active-bar-alt font-bold" : ''}`}><FormattedMessage id="afternoon_record" /></button>
                                </>
                            }
                        </div>
                    }
                    <div className="flex ml-15 md:ml-0">
                        <button type="button" title={ `${ intl.formatMessage({ id: "search" }) }` } className="cursor-pointer"><CiSearch className="size-6"/></button>
                        <button type="button" title={ `${ intl.formatMessage({ id: "notifications" }) }` } className="cursor-pointer"><IoIosNotifications className="size-6 ml-8"/></button>
                    </div>
                    <div className="flex ml-15">
                        <button type="button" title={ `${ intl.formatMessage({ id: "profile" }) }` } className="flex items-center justify-center cursor-pointer">
                            <p className="hidden md:block">{ user?.firstName + ' ' + user?.sureName }</p>
                            <img className="ml-5 w-10 h-10 rounded-full border-2 border-pink-100" src={example} alt="Avatar"></img>
                        </button>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header;