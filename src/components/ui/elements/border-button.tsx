import React from 'react';

interface BorderButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function BorderButton({ children, className = '', ...props}: BorderButton) {
    return (
        <>
            <button className={`border-2 rounded-2xl w-3/4 h-14 cursor-pointer border-primary dark:border-primary-dark hover:bg-brand-active dark:hover:bg-brand-active-dark ${className}`} {...props}>
                {children}
            </button>
        </>
    )
}

export default BorderButton