export function clamp(value: number, min: number, max: number) {
    if (max < min) {
        var temp = max;
        max = min;
        min = temp;
    }

    return Math.max(Math.min(max, value), min);
}