import { type PageType } from "@/util/paging";
import usePersistedState from "@/util/usePersistedState";
import { createContext, useContext } from "react";

interface LayoutContextType {
  isDaily: boolean;
  setIsDaily: (value: boolean) => void;

  currentPage: PageType;
  setCurrentPage: (value: PageType) => void;

  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const defaultContextType: LayoutContextType = {
  isDaily: false,
  setIsDaily: (_: boolean) => { return; },

  currentPage: 'home',
  setCurrentPage: (_: PageType) => { return; },

  isDarkMode: false,
  setIsDarkMode: (_: boolean) => { return; }
}

const LayoutContext = createContext<LayoutContextType>(defaultContextType);

export function LayoutProvider({ children }: {children: React.ReactNode}) {
  const [isDaily, setIsDaily] = usePersistedState("isDaily", false);
  const [isDarkMode, setIsDarkMode] = usePersistedState("isDarkMode", false);
  const [currentPage, setCurrentPage] = usePersistedState<PageType>("currentPage", "home");

  return (
    <LayoutContext.Provider value={{ isDaily: isDaily, setIsDaily: setIsDaily,
                                      currentPage: currentPage, setCurrentPage: setCurrentPage,
                                      isDarkMode: isDarkMode, setIsDarkMode: setIsDarkMode }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  return useContext(LayoutContext);
}