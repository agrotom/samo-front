import BorderButton from "@/components/ui/elements/border-button";
import SidebarButton from "./sidebar-button";
import SidebarElement from "./sidebar-element";
import { FaCalendarAlt, FaBook } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import { MdCheckBox, MdOutlineBarChart } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useLayout } from "@/components/provider/layoutProvider";
import setIsDaily from "@/util/dailySwitch";

interface SidebarProperties {
    isExpanded: () => boolean;
    setIsExtended: (value: boolean) => void;
}

function Sidebar({ isExpanded, setIsExtended }: SidebarProperties) {

    const isHidden = () => isExpanded() ? '' : 'hidden';
    const toggle = () => setIsExtended(!isExpanded()); //${ !isMobile ? (isExpanded() ? 'sm:w-72' : 'w-27') : (isExpanded() ? 'w-full' : '-translate-x-full w-full') }

    const layoutData = useLayout();

    return (
        <>
            <aside id="sidebar" aria-label="sidebar" className={`text-primary dark:text-primary-dark fixed top-0 left-0 h-full bg-brand dark:bg-brand-dark shadow-[4px_0_8px_rgba(0,0,0,0.2)] transform lg:transition-[width] sm:transition-transform ease-in-out z-50 duration-50 -translate-x-full lg:translate-x-0 ${isExpanded() ? 'translate-x-0 w-full lg:w-72' : 'w-27' }`}> 
                <div className='bg-brand dark:bg-brand-dark h-full'>
                    <div className="pt-4 font-bold text-xl text-primary dark:text-primary-dark"><p>{ isExpanded() ? <>Samo</> : <>S</> }</p></div>
                    <div className="border-t border-separator dark:border-separator-dark my-4"></div>
                    <nav className="flex-1 h-full">
                        <ul className="flex flex-col items-center h-full">
                            <SidebarElement>
                                <SidebarButton isActive={false} onClick={ toggle } className='my-5'>
                                    {
                                        isExpanded() ?
                                        <IoIosArrowBack className="size-6 me-5" /> :
                                        <IoIosArrowForward className="size-6 me-5"/>
                                    }
                                    <div className={ isHidden() }>Свернуть</div>
                                </SidebarButton>
                            </SidebarElement>
                            <SidebarElement>
                                <SidebarButton navigateTo="home">
                                    <AiFillHome className="size-6 me-5"/>
                                    <div className={ isHidden() }>Главная страница</div>
                                </SidebarButton>
                            </SidebarElement>
                            <SidebarElement>
                                <SidebarButton navigateTo="diary">
                                    <FaCalendarAlt className="size-6 me-5"/>
                                    <div className={ isHidden() }>Дневник</div>
                                </SidebarButton>
                            </SidebarElement>
                            <SidebarElement>
                                <SidebarButton navigateTo="goals">
                                    <MdCheckBox className="size-6 me-5"/>
                                    <div className={ isHidden() }>Мои цели</div>
                                </SidebarButton>
                            </SidebarElement>
                            <SidebarElement>
                                <SidebarButton navigateTo="lists">
                                    <FaBook className="size-6 me-5"/>
                                    <div className={ isHidden() }>Списки</div>
                                </SidebarButton>
                            </SidebarElement>
                            <SidebarElement>
                                <SidebarButton navigateTo="results">
                                    <MdOutlineBarChart className="size-6 me-5"/>
                                    <div className={ isHidden() }>Итоги</div>
                                </SidebarButton>
                            </SidebarElement>
                            <SidebarElement className='mx-auto'>
                                <SidebarButton navigateTo="settings">
                                    <FaGear className="size-6 me-5"/>
                                    <div className={ isHidden() }>Настройки</div>
                                </SidebarButton>
                            </SidebarElement>
                            {
                                layoutData.currentPage === 'diary' &&
                                <SidebarElement className={`flex items-center justify-center mx-auto lg:hidden  ${ isHidden() }`}>
                                    <button onClick={ () => { setIsDaily(layoutData.setIsDaily, layoutData.setIsDarkMode, true); } } className={`px-2 cursor-pointer ${layoutData.isDaily ? "border-b-4 border-active-bar-dark font-bold" : ''}`}>Утренний отчет</button>
                                    <button onClick={ () => { setIsDaily(layoutData.setIsDaily, layoutData.setIsDarkMode, false); } } className={`px-2 cursor-pointer ml-5 ${!layoutData.isDaily ? "border-b-4 border-active-bar-dark font-bold" : ''}`}>Вечерний отчет</button>
                                </SidebarElement>
                            }
                            <SidebarElement className={`flex flex-col absolute bottom-0 items-center category justify-center mb-10 ${isHidden()}`}>
                                <BorderButton children={ 'Выйти' } />
                            </SidebarElement>
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    )
}

export default Sidebar;