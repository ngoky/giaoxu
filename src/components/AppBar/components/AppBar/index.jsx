import React from "react";
import {
  Toolbar,
  AppBar as MuiAppBar,
  styled,
} from "@mui/material";

import MyMenu from "../Menu";
import Account from "../Account";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open, width = 0 }) => ({
  // flexGrow:0,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  boxShadow: "none",
  // width: "100%",
  width: `calc(100% + ${width}px)`,
  maxHeight: "60px",
  marginLeft: `0px`,
  ...(open && {
    width: `100%`,
    // marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  })
}));

const Menu = ({ check, theme, width }) => {
  return (
    <AppBar
      id="AppBar"
      position="relative"
      theme={theme}
      open={check}
      width={width}
    >
      <Toolbar id="Toolbar" style={{ minHeight: "60px", maxHeight: "60px" }}>
        <MyMenu sx={{ width: 100, minHeight: "60px", maxHeight: "60px" }} />
        <Account />
      </Toolbar>
    </AppBar>
  );
};
export default Menu;
