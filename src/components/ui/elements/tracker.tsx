import { useEffect, useRef, useState } from "react";
import type { TrackerData } from "@/api/trackers";

interface TrackerProperties {
    label?: string;
    totalSteps?: number;
    step?: number;
    onChange?: (_: TrackerData) => void;
    className?: string;
    stretch?: boolean;
}

export default function Tracker({ label = '', totalSteps = 11, step = 1, onChange = (_: TrackerData) => { return; }, className = '', stretch = false }: TrackerProperties) {
    const [currentStep, setCurrentStep] = useState<number>(step);
    const [dragging, setDragging] = useState<boolean>(false);

    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        onChange({ name: label, totalSteps: totalSteps, currentStep: currentStep });
    }, [currentStep]);

    const updateValue = (clientX: number) => {
        if (!barRef.current) return;
        const rect = barRef.current.getBoundingClientRect();
        const relative = (clientX - rect.left) / rect.width;
        const step = Math.floor(relative * totalSteps) + 1;
        setCurrentStep(Math.max(Math.min(step, totalSteps), 1));
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
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <>
        <div className={`w-full sm:flex sm:flex-col md:flex-row items-center gap-6 select-none touch-none ${className}`}>
            {
                label != '' &&
                <div className="flex-shrink-0 text-left text-sm text-primary w-32">
                    {label}
                </div>
            }
            <div className={`w-full ${ !stretch && 'max-w-md' } mx-auto select-none`}>
                <div className="flex justify-between mb-2">
                    {Array.from({ length: totalSteps }).map((_, i) => (
                    <div key={i} className={`text-sm font-medium text-center w-4 ${ i == 0 || i == currentStep - 1 || i == totalSteps - 1 ? 'text-primary font-medium dark:text-active-bar-dark' : 'text-inactive' }`}>
                        {i}
                    </div>
                    ))}
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
                    {Array.from({ length: totalSteps }).map((_, i) => {
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