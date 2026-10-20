import type { SVGProps } from "react";

const FILE_PATH = "/sprite.svg";

interface SpriteProps extends SVGProps<SVGSVGElement> {
    spriteId: string;
}

const Sprite = ({ spriteId, ...props }: SpriteProps) => {
    return (
        <svg { ...props }>
            <use href={ `${ FILE_PATH }#sprite-${ spriteId }` } />
        </svg>
    );
}

export const BottomImageDark = ({ ...props }: SVGProps<SVGSVGElement>) => {
    return (
        <Sprite spriteId="bottom-image-dark" { ...props } />
    );
}

export const BottomImageLeft = ({ ...props }: SVGProps<SVGSVGElement>) => {
    return (
        <Sprite spriteId="bottom-image-left" { ...props } />
    );
}

export const BottomImage = ({ ...props }: SVGProps<SVGSVGElement>) => {
    return (
        <Sprite spriteId="bottom-image" { ...props } />
    );
}

export const CornerImage = ({ ...props }: SVGProps<SVGSVGElement>) => {
    return (
        <Sprite spriteId="corner-image" { ...props } />
    );
}

export const CurveImage = ({ ...props }: SVGProps<SVGSVGElement>) => {
    return (
        <Sprite spriteId="curve-image" { ...props } />
    );
}

export const NoteImage = ({ ...props }: SVGProps<SVGSVGElement>) => {
    return (
        <Sprite spriteId="note" { ...props } />
    );
}

export const TrackerImage = ({ ...props }: SVGProps<SVGSVGElement>) => {
    return (
        <Sprite spriteId="tracker" { ...props } />
    );
}

export const TopImageMiddleNoEnds = ({ ...props }: SVGProps<SVGSVGElement>) => {
    return (
        <Sprite spriteId="top-image-middle-noends" { ...props } />
    );
}

export const TopImageMiddle = ({ ...props }: SVGProps<SVGSVGElement>) => {
    return (
        <Sprite spriteId="top-image-middle" { ...props } />
    );
}

export const TopImageRight = ({ ...props }: SVGProps<SVGSVGElement>) => {
    return (
        <Sprite spriteId="top-image-right" { ...props } />
    );
}