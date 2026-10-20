export interface Balance {
    id: string;
    color: string;
}

export const LifeBrightness: Balance = {
    id: "lifeBrightness",
    color: "blue"
};

export const SportAndHealth: Balance = {
    id: "sportAndHealth",
    color: "orange"
};

export const FamilyAndLove: Balance = {
    id: "familyAndLove",
    color: "violet"
};

export const PersonalGrowth: Balance = {
    id: "personalGrowth",
    color: "yellow"
};

export const Charity: Balance = {
    id: "charity",
    color: "pink"
};

export const Investments: Balance = {
    id: "investments",
    color: "green"
};

export const SurroundingsAndFriends: Balance = {
    id: "surroundingsAndFriends",
    color: "red"
}

export const BuisnessAndCareer: Balance = {
    id: "buisnessAndCareer",
    color: "cyan"
};

export const BalanceTypes: Record<string, Balance> = {
    familyAndLove : FamilyAndLove,
    lifeBrightness : LifeBrightness,
    sportAndHealth : SportAndHealth,
    personalGrowth : PersonalGrowth,
    charity : Charity,
    investments : Investments,
    surroundingsAndFriends : SurroundingsAndFriends,
    buisnessAndCareer : BuisnessAndCareer
};