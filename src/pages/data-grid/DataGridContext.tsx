import React from "react";

export const DataGridContext = React.createContext({
  editingId: "",
  setEditingId: (id: string) => {},
  isCreating: false,
  setIsCreating: (flag: boolean) => {},
});
