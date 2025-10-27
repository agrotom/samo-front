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

export const SunPower: Balance = {
    id: "sunPower",
    locale: "Солнечная энергия",
    color: "orange"
};

export const BalanceTypes: Record<string, Balance> = {
    lifeBrightness: LifeBrightness,
    sunPower: SunPower
};