import { useTheme, Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { MenuOpen, Menu } from "@mui/icons-material";
import MyMenu from "./components/AppBar/components/AppBar";
import Banner from "./components/Banner";
import Routers from "./routes";
import { alertActions } from "./storage/actions";
import { connect } from "react-redux";

import "./App.scss";
import LeftDrawer from "./components/Drawable";
import Display from "./components/Display";
import MenuLayout from "./components/MenuButton";
import "./translation/i18n";

const drawerWidth = 240;
const menuButtonWidth = 40;

const App = () => {
  const theme = useTheme();
  const [open, setOpen] = useState();
  const [auth, setAuth] = useState();

  const openHander = (mark) => {
    setOpen(mark);
    document.body.style.overflow = mark ? "hidden" : "auto";
  };
  useEffect(() => {
    setAuth(null);
  }, []);
  return (
    // <Suspense fallback="loading">
    <Box display="flex" className="App">
      <LeftDrawer
        theme={theme}
        width={drawerWidth}
        open={open}
        handleDrawer={openHander}
      />
      <Display theme={theme} open={open} width={drawerWidth}>
        <header className="App-header">
          <Banner theme={theme}>
            <img
              src="https://image.shutterstock.com/image-illustration/3d-illustration-conceptual-wood-cross-600w-679159084.jpg"
              alt="banner"
              width="100%"
              height="100px"
            />
          </Banner>
          <MyMenu theme={theme} open={open} />
        </header>
        <div
          className="content"
          style={{
            position: "relative",
            margin: `0 ${menuButtonWidth}px 0 ${menuButtonWidth}px`,
            overflow: "hidden"
          }}
        >
          <BrowserRouter>
            <Routers auth={auth} />
          </BrowserRouter>
        </div>
      </Display>
      <MenuLayout
        open={open}
        width={drawerWidth}
        style={{
          background: `${open ? "black" : "transparent"}`,
          width: `${open ? "100%" : `${menuButtonWidth}px`}`,
          height: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          display: "flex",
          opacity: 0.8,
          textAlign: "center",
          scrollBehavior: "unset"
        }}
      >
        <Button
          onClick={() => openHander(!open)}
          style={{
            background: `${open ? "blue" : "transparent"}`,
            maxWidth: `${menuButtonWidth}px`,
            minWidth: `${menuButtonWidth}px`,
            padding: 0
          }}
          title="open menu"
        >
          {(open && <MenuOpen />) || <Menu />}
        </Button>
      </MenuLayout>
    </Box>
    // </Suspense>
  );
};

const mapState = (state) => {
  const { alert } = state;
  return { alert };
};

const actionCreators = {
  clearAlerts: alertActions.clear
};

const ConnectedApp = connect(mapState, actionCreators)(App);
export default ConnectedApp;
