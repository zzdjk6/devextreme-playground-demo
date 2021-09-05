import React from "react";
import { Memo } from "../models/Memo";
import { createDataContext, useDataContextValue } from "./DataContext";

export const MemosContext = createDataContext<Memo>();

const MemosContextProvider: React.FC = ({ children }) => {
  const { value } = useDataContextValue<Memo>();
  return (
    <MemosContext.Provider value={value}>{children}</MemosContext.Provider>
  );
};

export default MemosContextProvider;
