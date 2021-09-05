import TableCell from "@material-ui/core/TableCell";
import StatusFilterCell from "./StatusFilterCell";
import { TableFilterRow } from "@devexpress/dx-react-grid-material-ui";
import React from "react";

const FilterCell: React.FC<any> = (props) => {
  const { column } = props;

  if (column.name === "actions") {
    return <TableCell />;
  }

  if (column.name === "status") {
    return <StatusFilterCell {...props} />;
  }
  return <TableFilterRow.Cell {...props} />;
};

export default FilterCell;
