import get from "lodash/get";
import React from "react";

export type DataContextValue<T> = {
  data: Record<string, T>;
  addOne: (item: T) => void;
  deleteOne: (id: string) => void;
  deleteAll: () => void;
  updateOne: (id: string, changes: Partial<Omit<T, "id">>) => void;
  getOne: (id: string) => T | null;
};

export function createDataContext<T>() {
  return React.createContext<DataContextValue<T>>({
    data: {},
    addOne: () => {},
    deleteOne: () => {},
    deleteAll: () => {},
    updateOne: () => {},
    getOne: () => null,
  });
}

export function useDataContextValue<T>() {
  const [data, setData] = React.useState({});

  const addOne = React.useCallback<DataContextValue<T>["addOne"]>((item) => {
    setData((prevState) => {
      return {
        ...prevState,
        [get(item, "id")]: item,
      };
    });
  }, []);

  const deleteOne = React.useCallback<DataContextValue<T>["deleteOne"]>(
    (id) => {
      setData((prevState) => {
        const newState = { ...prevState };
        delete newState[id];
        return newState;
      });
    },
    []
  );

  const deleteAll = React.useCallback(() => {
    setData({});
  }, []);

  const updateOne = React.useCallback<DataContextValue<T>["updateOne"]>(
    (id, changes) => {
      setData((prevState) => {
        if (!prevState[id]) {
          return prevState;
        }

        return {
          ...prevState,
          [id]: {
            ...prevState[id],
            ...changes,
          },
        };
      });
    },
    []
  );

  const getOne = React.useCallback(
    (id: string) => {
      return data[id] || null;
    },
    [data]
  );

  const value = React.useMemo<DataContextValue<T>>(() => {
    return {
      data,
      addOne,
      deleteOne,
      deleteAll,
      updateOne,
      getOne,
    };
  }, [data, addOne, deleteOne, deleteAll, updateOne, getOne]);

  return { value };
}
