import { NavigationItem } from "../models/NavigationItem";
import React from "react";

export type NavigationContextValue = {
  activeNavigation: NavigationItem;
  changeNavigation: (navItem: NavigationItem) => void;
};

export const NavigationContext = React.createContext<NavigationContextValue>({
  activeNavigation: NavigationItem.DataGrid,
  changeNavigation: () => {},
});

const NavigationContextProvider: React.FC = ({ children }) => {
  const [activeNavItem, setActiveNavItem] = React.useState<NavigationItem>(
    NavigationItem.DataGrid
  );

  const value = React.useMemo<NavigationContextValue>(() => {
    return {
      activeNavigation: activeNavItem,
      changeNavigation: (navItem) => {
        setActiveNavItem(navItem);
      },
    };
  }, [activeNavItem]);

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationContextProvider;
