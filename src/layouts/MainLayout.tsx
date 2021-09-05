import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { NavigationContext } from "../contexts/NavigationContext";
import { NavigationItem } from "../models/NavigationItem";
import styled, { css } from "styled-components";

const MainLayout: React.FC = ({ children }) => {
  const { activeNavigation, changeNavigation } = React.useContext(
    NavigationContext
  );

  return (
    <StyledRoot>
      <StyledAppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Memos</Typography>
        </Toolbar>
      </StyledAppBar>

      <StyledDrawer variant="permanent">
        <Toolbar />
        <StyledDrawerContainer>
          <List>
            <ListItem
              button
              selected={activeNavigation === NavigationItem.DataGrid}
              onClick={() => changeNavigation(NavigationItem.DataGrid)}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Data Grid"} />
            </ListItem>
            <ListItem
              button
              selected={activeNavigation === NavigationItem.Scheduler}
              onClick={() => changeNavigation(NavigationItem.Scheduler)}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Scheduler"} />
            </ListItem>
            <Divider />
            <ListItem
              button
              selected={activeNavigation === NavigationItem.Chart}
              onClick={() => changeNavigation(NavigationItem.Chart)}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Chart"} />
            </ListItem>
          </List>
        </StyledDrawerContainer>
      </StyledDrawer>
      <StyledContent>
        <Toolbar />
        {children}
      </StyledContent>
    </StyledRoot>
  );
};

const StyledRoot = styled.div`
  display: flex;
`;

const StyledAppBar = styled(AppBar)(
  (props) => css`
    z-index: ${props.theme.zIndex.drawer + 1};
  `
);

const StyledDrawer = styled(Drawer)(
  (props) => css`
    width: 240px;
    flex-shrink: 0;

    .MuiDrawer-paper {
      width: 240px;
    }
  `
);

const StyledDrawerContainer = styled.div`
  overflow: auto;
`;

const StyledContent = styled.main`
  flex-grow: 1;
  padding: 12px;
`;

export default MainLayout;
