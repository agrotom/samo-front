import { useEffect, useRef, useState } from "react";
import type EditableProperties from "../common/editable";
import InlineEditableText from "./editableDiv";
import { clamp } from "@/util/math";

const MAX_STEPS = 11;
const MIN_STEPS = 2;

interface TrackerChangedEvent {
    name: string;
    totalSteps: number;
    currentStep: number;
}

interface TrackerProperties extends EditableProperties {
    label?: string;
    totalSteps?: number;
    step?: number;
    onChange?: (event: TrackerChangedEvent) => void;
    className?: string;
    stretch?: boolean;
}

export default function Tracker({ label = '', totalSteps = 11, step = 1, onChange, className = '', editable, stretch = false }: TrackerProperties) {
    const [currentStep, setCurrentStep] = useState<number>(clamp(step, 1, totalSteps));
    const [totalStepsNow, setTotalStepsNow] = useState<number>(totalSteps);
    const [tempTotalSteps, setTempTotalSteps] = useState<number>(totalSteps);
    const [dragging, setDragging] = useState<boolean>(false);

    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (currentStep > totalStepsNow) {
            setCurrentStep(totalStepsNow);
        }

        onChange?.({ name: label, totalSteps: clamp(totalStepsNow, MIN_STEPS, MAX_STEPS), currentStep: clamp(currentStep, 1, totalStepsNow) });
    }, [currentStep, totalStepsNow]);

    const onTotalStepsChanged = (newValue: string) => {
        var value = Number.parseInt(newValue);
        if (!isNaN(value)) {
            setTempTotalSteps(value + 1);
        }
    }

    const updateValue = (clientX: number) => {
        if (!barRef.current) return;
        const rect = barRef.current.getBoundingClientRect();
        const relative = (clientX - rect.left) / rect.width;
        const step = Math.floor(relative * totalStepsNow) + 1;
        setCurrentStep(clamp(step, 1, totalStepsNow));
    };

    const handleMouseDown = (e: any) => {
        setDragging(true);
        updateValue(e.clientX);
    };

    const handleMouseMove = (e: any) => {
        if (dragging) updateValue(e.clientX);
    };

    const handleMouseUp = () => setDragging(false);

    const onTouchStart = (e: any) => {
        setDragging(true);
        updateValue(e.touches[0].clientX);
    }
    const onTouchMove = (e: any) => {
        if (dragging) updateValue(e.touches[0].clientX);
    }

    const onTouchEnd = () => setDragging(false);

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("touchmove", onTouchMove);
        document.addEventListener("touchend", onTouchEnd);
        
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("touchmove", onTouchMove);
            document.removeEventListener("touchend", onTouchEnd);
        };
    });

  // вычисляем процент заполнения
  const progress = ((currentStep - 1) / (totalStepsNow - 1)) * 100;

  return (
    <>
        <div className={`w-full sm:flex sm:flex-col md:flex-row items-center gap-6 select-none touch-none ${className}`}>
            {
                label != '' &&
                <InlineEditableText initText={label} editingAllow={editable} classNames={ { container: "flex-shrink-0 text-left text-sm text-primary w-32", input: "w-full" } } />

            }
            <div className={`w-full ${ !stretch && 'max-w-md' } mx-auto select-none`}>
                <div className="flex justify-between mb-2">
                    {Array.from({ length: totalStepsNow - 1 }).map((_, i) => (
                    <div key={i} className={`text-sm font-medium text-center w-4 ${ i == 0 || i == currentStep - 1 || i == totalStepsNow - 1 ? 'text-primary font-medium dark:text-active-bar-dark' : 'text-inactive' }`}>
                        {i}
                    </div>
                    ))}
                    <div className={`text-sm font-medium text-center w-4 text-primary dark:text-active-bar-dark`}>
                        <InlineEditableText onChange={ onTotalStepsChanged } onBlur={() => setTotalStepsNow(clamp(tempTotalSteps, MIN_STEPS, MAX_STEPS))} editingAllow={editable} numberOnly initText={`${totalStepsNow - 1}`} classNames={ { container: "overflow-hidden h-5", input: "w-full" } } />
                    </div>
                </div>
                <div className="relative">
                    {/* Фон линии */}
                    <div ref={barRef} className="absolute top-1/2 w-full h-1 bg-inactive -translate-y-1/2 rounded"></div>

                    {/* Заполненная линия */}
                    <div
                        className="absolute top-1/2 h-1 bg-primary dark:bg-active-bar-dark rounded -translate-y-1/2 transition-all duration-500 ease-out"
                        style={{ width: `${Math.round(progress)}%` }}
                    ></div>

                    {/* Кликабельные точки */}
                    <div className="flex justify-between relative z-10">
                    {Array.from({ length: totalStepsNow }).map((_, i) => {
                        const step = i + 1;
                        const isActive = step === Math.round(currentStep);

                        return (
                        <div
                            key={i}
                            onMouseDown={handleMouseDown}
                            onTouchStart={onTouchStart}
                            onClick={ () => setCurrentStep(step) }
                            className={`relative w-4 h-4 rounded-full cursor-pointer transition-all duration-300 ${
                            isActive ? "bg-primary dark:bg-active-bar-dark scale-75" : "bg-transparent"
                            }`}
                        >
                        </div>
                        );
                    })}
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}