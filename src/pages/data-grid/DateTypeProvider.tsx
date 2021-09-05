import { DataTypeProvider } from "@devexpress/dx-react-grid";
import React from "react";

const DateFormatter: React.FC<{ value: any }> = ({ value }) => {
  const formatted = React.useMemo(() => {
    const formatter = new Intl.DateTimeFormat(undefined, {
      dateStyle: "short",
      timeStyle: "short",
    });

    if (!value) {
      return "";
    }

    try {
      return formatter.format(new Date(value));
    } catch {
      return "";
    }
  }, [value]);

  return <span>{formatted}</span>;
};

const DateTypeProvider: React.FC<any> = (props) => (
  <DataTypeProvider formatterComponent={DateFormatter} {...props} />
);

export default DateTypeProvider;
