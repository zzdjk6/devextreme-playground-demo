import React from "react";
import { Memo } from "../../models/Memo";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import MuiGrid from "@material-ui/core/Grid";

const RowDetail: React.FC<{ row: Memo }> = ({ row }) => {
  return (
    <StyledRowPaper>
      <MuiGrid container direction={"column"} spacing={2}>
        <MuiGrid item>ID: {row.id}</MuiGrid>
        <MuiGrid item>{row.description}</MuiGrid>
      </MuiGrid>
    </StyledRowPaper>
  );
};

const StyledRowPaper = styled(Paper)`
  padding: 24px;
  line-height: 1.5;
`;

export default RowDetail;
