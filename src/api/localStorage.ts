const IS_DAILY = "isDaily";

export function saveIsDaily(isDaily: boolean) {
    localStorage.setItem(IS_DAILY, isDaily.toString());
}

export function loadIsDaily(): boolean {
    const value: string | null = localStorage.getItem(IS_DAILY);

    if (!value) {
        return false;
    }

    return value === "true";
}

export function saveState<T>(key: string, state: T) {
    localStorage.setItem(key, JSON.stringify(state));
}

export function loadState<T>(key: string): T | null {
    const value: string | null = localStorage.getItem(key);

    if (!value) {
        return null;
    }

    try {
        return JSON.parse(value) as T;
    }
    catch {
        return null;
    }
}