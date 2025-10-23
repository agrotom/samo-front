interface UserInfo {
    firstName: string;
    sureName: string;
}

export function getUser(): string {
    return "agro_tom";
}

export function getUserInfo(): UserInfo {
    return {
        firstName: "Иван",
        sureName: "Иванов"
    };
}