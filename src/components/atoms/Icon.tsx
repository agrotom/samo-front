import type { SVGProps } from "react";

const FILE_PATH = "/icon.svg";

export const EditIcon = ({ ...props }: SVGProps<SVGSVGElement>) => {
    return (
        <svg width={ 21 } height={ 20 } { ...props }>
            <use href={ `${ FILE_PATH }#icon-edit` } />
        </svg>
    );
}

export const OpenCalendarIcon = ({ ...props }: SVGProps<SVGSVGElement>) => {
    return (
        <svg width={ 24 } height={ 24 } { ...props }>
            <use href={ `${ FILE_PATH }#icon-open-calendar` } />
        </svg>
    );
}

export const CheckIcon = ({ ...props }: SVGProps<SVGSVGElement>) => {
    return (
        <svg width={ 23 } height={ 23 } { ...props }>
            <use href={ `${ FILE_PATH }#icon-check` } />
        </svg>
    );
}