import styled from "@emotion/styled";
import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { SideMenu } from "./components";

const menuWidth = 200;
const SideMenuParent = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open = false, width = 0 }) => ({
  flexDirection: "row",
  flexGrow: 0,
  // padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  position: "sticky",
  height: "auto",
  width: 60,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    justifyItems: "center",
    marginLeft: 0,
    overflow: "hidden",
    width,
  }),
}));

const Display = styled(Box, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open = false, width = 0 }) => ({
    flexDirection: "row",
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginLeft: `-${width - 60}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      // marginLeft: 0,
      overflow: "hidden",
    }),
  })
);

const Admin = (props) => {
  const { pathname } = useLocation();
  const theme = useTheme();
  const [open = props.open || true, setOpen] = useState();
  //const { open = true } = props;
  useEffect(() => {
    setOpen(true);
  }, [setOpen]);
  return (
    <Box display="flex">
      <SideMenuParent theme={theme} width={menuWidth} open={open}>
        <SideMenu open={open} />
      </SideMenuParent>
      <Display theme={theme} width={menuWidth} open={open}>
        <Outlet id="ma-no" />
      </Display>
      {pathname === "/admin" && <Navigate to="news" />}
    </Box>
  );
};
export default Admin;
