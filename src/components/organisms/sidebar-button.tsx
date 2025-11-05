import { type PageType } from "@/util/paging";
import { useNavigate } from "react-router-dom";
import { useLayout } from "@/provider/layoutProvider";

interface SidebarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;

    isActive?: boolean;
    navigateTo?: PageType;
}

const ACTIVE_STYLE = 'bg-brand-active focus:bg-brand-active lg:shadow-brand-active';

function SidebarButton({ children, className, isActive = true, navigateTo = "home", ...props }: SidebarButtonProps) {
    const navigate = useNavigate();
    const layoutData = useLayout();
    
    return (
        isActive ?
        <button onClick={ () => { layoutData.setCurrentPage(navigateTo); navigate('/' + navigateTo); } } {...props} className={`flex py-4 pl-10 text-left w-full cursor-pointer font-medium ${className} ${(layoutData.currentPage == navigateTo ? ACTIVE_STYLE : 'hover:bg-brand-hover')}`}>
            {children}
        </button> :
        <button {...props} className={`flex py-4 pl-10 text-left w-full hover:bg-brand-hover cursor-pointer font-medium ${className}`}>
            {children}
        </button>
    )
}

export default SidebarButton