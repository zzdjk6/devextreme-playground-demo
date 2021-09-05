import { Grid } from "@devexpress/dx-react-grid-material-ui";
import React from "react";

// Toolbar height = 64px
const GridRoot: React.FC<any> = (props) => (
  <Grid.Root {...props} style={{ height: "calc(100% - 64px)" }} />
);

export default GridRoot;
