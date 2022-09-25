import { useTheme, Box, Button } from "@mui/material";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { MenuOpen, Menu } from '@mui/icons-material'
import MyMenu from "./components/AppBar/components/AppBar";
import Banner from "./components/Banner";
import Routers from "./routes";

import "./App.css";
import LeftDrawer from "./components/Drawable";
import Display from "./components/Display";
import MenuLayout from "./components/MenuButton";

const drawerWidth = 240;

const App = () => {
  const theme = useTheme();
  const [open, setOpen] = useState();
  const openHander = (mark) => {
    setOpen(mark);
  };
  return (
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
        <div className="content" style={{ position: "relative" }}>
          <BrowserRouter>
            <Routers />
          </BrowserRouter>
        </div>
      </Display>
      <MenuLayout
        open={open}
        width={drawerWidth}
        style={{
          background: `${open ? "black" : 'transparent'}`,
          width: `${open ? "100%" : 'auto'}`,
          height: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          display: 'flex',
          opacity: 0.8,
          textAlign: 'center'
        }}
      >
        <Button
          onClick={() => openHander(!open)}
          text="Test"
          style={{
            background: 'transparent'
          }}
        >
          {open && <MenuOpen /> || <Menu />}
        </Button>
      </MenuLayout>
    </Box>
  );
};
export default App;
