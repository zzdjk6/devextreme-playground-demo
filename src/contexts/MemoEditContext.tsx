import React from "react";

export const MemoEditContext = React.createContext({
  editingId: "",
  setEditingId: (id: string) => {},
  isCreating: false,
  setIsCreating: (flag: boolean) => {},
});
