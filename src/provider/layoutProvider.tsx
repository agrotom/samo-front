import { LOCALES } from "@/i18n/locales";
import { type PageType } from "@/interfaces/paging";
import usePersistedState from "@/hooks/usePersistedState";
import { createContext, useContext, useState } from "react";

interface LayoutContextType {
  isDaily: boolean;
  setIsDaily: (value: boolean) => void;

  currentPage: PageType;
  setCurrentPage: (value: PageType) => void;

  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;

  locale: string;
  setLocale: (value: string) => void;

  diaryDate: Date;
  setDiaryDate: (value: Date) => void;
}

const defaultContextType: LayoutContextType = {
  isDaily: false,
  setIsDaily: (_: boolean) => { return; },

  currentPage: 'home',
  setCurrentPage: (_: PageType) => { return; },

  isDarkMode: false,
  setIsDarkMode: (_: boolean) => { return; },

  locale: LOCALES.ENGLISH,
  setLocale: (_: string) => { return; },

  diaryDate: new Date,
  setDiaryDate: (_: Date) => { return; }
}

const LayoutContext = createContext<LayoutContextType>(defaultContextType);

export function LayoutProvider({ children }: {children: React.ReactNode}) {
  const [isDaily, setIsDaily] = usePersistedState("isDaily", false);
  const [isDarkMode, setIsDarkMode] = usePersistedState("isDarkMode", false);
  const [currentPage, setCurrentPage] = usePersistedState<PageType>("currentPage", "home");
  const [locale, setLocale] = usePersistedState<string>("locale", "en-US");

  const [diaryDate, setDiaryDate] = useState<Date>(new Date());

  return (
    <LayoutContext.Provider value={{ isDaily: isDaily, setIsDaily: setIsDaily,
                                      currentPage: currentPage, setCurrentPage: setCurrentPage,
                                      isDarkMode: isDarkMode, setIsDarkMode: setIsDarkMode,
                                      locale: locale, setLocale: setLocale,
                                      diaryDate: diaryDate, setDiaryDate: setDiaryDate }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  return useContext(LayoutContext);
}