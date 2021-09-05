import MuiGrid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import React from "react";
import { DataTypeProvider } from "@devexpress/dx-react-grid";

const TagFormatter: React.FC<{ value: any }> = ({ value }) => {
  if (Array.isArray(value)) {
    return (
      <MuiGrid container spacing={1}>
        {value.map((item, idx) => (
          <MuiGrid item key={idx}>
            <Chip label={item} />
          </MuiGrid>
        ))}
      </MuiGrid>
    );
  }

  return <Chip label={value} />;
};

const TagTypeProvider: React.FC<any> = (props) => (
  <DataTypeProvider formatterComponent={TagFormatter} {...props} />
);

export default TagTypeProvider;
