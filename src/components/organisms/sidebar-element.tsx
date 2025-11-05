interface SidebarElementProps extends React.ButtonHTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

function SidebarElement({ children, className = '', ...props}: SidebarElementProps) {
    return (
        <li className={`w-full ${className}`} {...props}>
            {children}
        </li>
    )
}

export default SidebarElement;