import React from "react";
import { DataTypeProvider } from "@devexpress/dx-react-grid";
import { DataGridContext } from "./DataGridContext";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MuiGrid from "@material-ui/core/Grid";
import { MemosContext } from "../../contexts/MemosContext";

const ActionsFormatter: React.FC<{ value: any }> = ({ value }) => {
  const id = value;
  const { setEditingId } = React.useContext(DataGridContext);
  const { deleteOne } = React.useContext(MemosContext);

  return (
    <MuiGrid container>
      <MuiGrid item>
        <IconButton color={"primary"} onClick={() => setEditingId(id)}>
          <EditIcon />
        </IconButton>
      </MuiGrid>
      <MuiGrid item>
        <IconButton onClick={() => deleteOne(id)}>
          <DeleteIcon color={"error"} />
        </IconButton>
      </MuiGrid>
    </MuiGrid>
  );
};

const ActionsTypeProvider: React.FC<any> = (props) => (
  <DataTypeProvider formatterComponent={ActionsFormatter} {...props} />
);

export default ActionsTypeProvider;
