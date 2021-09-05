import React from "react";
import TableCell from "@material-ui/core/TableCell";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { MemoStatus } from "../../models/MemoStatus";
import faker from "faker";

const StatusFilterCell = ({ filter, onFilter, classes }) => {
  const [id] = React.useState<string>(faker.datatype.uuid);

  const handleChange = React.useCallback(
    (e) => {
      onFilter(e.target.value ? { value: e.target.value } : null);
    },
    [onFilter]
  );

  return (
    <TableCell>
      <FormControl fullWidth={true}>
        <Select
          id={id}
          value={filter ? filter.value : ""}
          onChange={handleChange}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value={MemoStatus.Complete}>Complete</MenuItem>
          <MenuItem value={MemoStatus.Active}>Active</MenuItem>
        </Select>
      </FormControl>
    </TableCell>
  );
};

export default StatusFilterCell;
