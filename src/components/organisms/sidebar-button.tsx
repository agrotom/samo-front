import { type PageType } from "@/interfaces/paging";
import { useNavigate } from "react-router-dom";
import { useLayout } from "@/provider/layoutProvider";
import { useIntl } from "react-intl";

interface SidebarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;

    isActive?: boolean;
    navigateTo?: PageType;
}

const ACTIVE_STYLE = 'bg-brand-active focus:bg-brand-active lg:shadow-brand-active';

function SidebarButton({ children, className, isActive = true, navigateTo = "home", ...props }: SidebarButtonProps) {
    const navigate = useNavigate();
    const layoutData = useLayout();

    const intl = useIntl();
    
    return (
        isActive ?
        <button type="button" title={ `${ intl.formatMessage({ id: navigateTo }) }` } onClick={ () => { layoutData.setCurrentPage(navigateTo); navigate('/' + navigateTo); } } {...props} className={`flex py-4 pl-10 text-left w-full cursor-pointer font-medium ${className} ${(layoutData.currentPage == navigateTo ? ACTIVE_STYLE : 'hover:bg-brand-hover')}`}>
            {children}
        </button> :
        <button type="button" title={ `${ intl.formatMessage({ id: navigateTo }) }` } {...props} className={`flex py-4 pl-10 text-left w-full hover:bg-brand-hover cursor-pointer font-medium ${className}`}>
            {children}
        </button>
    )
}

export default SidebarButton