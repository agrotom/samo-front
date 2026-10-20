export interface BarClassNames {
    loadingBar?: string;
    bar?: string;
}

export interface BarProperties {
    percentage: number;
    classNames?: BarClassNames;
}

export default function Bar({ percentage, classNames }: BarProperties) {
    return (
        <div className={`bg-inactive w-full h-2 rounded-lg ${ classNames?.bar }`}>
            <div style={{ width: `${ percentage }%` }} className={`bg-active-bar-alt h-2 rounded-lg ${classNames?.loadingBar}`} />
        </div>
    );
}