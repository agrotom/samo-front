const CURRENT_PAGE_TAG = 'currentPage';

export type PageType = "home" | "diary" | "objectives" | "lists" | "totals" | "settings"
export function pageName(type: PageType) {
    switch (type) {
        case "home":
            return "Главная страница";
        case "diary":
            return "Дневник";
        case "objectives":
            return "Цели";
        case "lists":
            return "Списки";
        case "totals":
            return "Итоги";
        case "settings":
            return "Настройки";
    }
}

export function saveCurrentPage(currentPage: number) {
    localStorage.setItem(CURRENT_PAGE_TAG, currentPage >= 0 && currentPage <= 6 ? currentPage.toString() : '0');
}

export function loadCurrentPage(): number {
    var cPage = localStorage.getItem(CURRENT_PAGE_TAG);

    if (cPage == null) {
        return 0;
    }

    var pageAsInt = Number.parseInt(cPage);

    if (pageAsInt < 0 || pageAsInt > 6) {
        return 0;
    }

    return pageAsInt;
}