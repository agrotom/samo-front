export interface Balance {
    id: string;
    locale: string;
    color: string;
}

export const LifeBrightness: Balance = {
    id: "lifeBrightness",
    locale: "Яркость жизни",
    color: "blue"
};

export const BalanceTypes: Record<string, Balance> = {
    lifeBrightness: LifeBrightness
};