import React, { useEffect } from "react";

import {
  Box,
  colors,
  Container,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

import "./index.scss";
import { useTranslation } from "react-i18next";

const MyMenu = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [index, setIndex] = React.useState(0);
  // const location = useLocation();
  const { auth } = props;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    // setIndex(0);
  };

  const { t } = useTranslation();

  const pages = t("menus.navbar", { returnObjects: true }).filter((x) => {
    // console.log("is false", x, (x?.authorize || false) === false);
    return (x?.authorize || false) === false || (x.authorize && auth);
  });

  useEffect(() => {
    const {
      location: { pathname }
    } = window;
    // console.log("call use effect", window.location);
    for (let i = 0; i < pages.length; i += 1) {
      const x = pages[i];
      if (pathname.startsWith(x.to)) {
        if (i !== index) {
          setIndex(i);
        }
        break;
      }
    }
  }, [index, pages]);

  // console.log("rerender", index);

  return (
    <Container maxWidth="xl" className="MyMenu">
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
          <Menu
            id="menu-appbar"
            className="MyMenu"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left"
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", sm: "none" }
            }}
          >
            {pages.map((page, i) => (
              <MenuItem
                className={
                  index === i ? "menu-item-popup-selected" : "menu-item"
                }
                key={`${page.to + i}`}
                sx={{ hover: { backgroundColor: colors.blueGrey } }}
              >
                <Typography
                  // className="item-text"
                  textAlign="center"
                  component="a"
                  href={page.to}
                >
                  {page.text}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Typography
          variant="h5"
          noWrap
          // component="a"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          // href=""
          className="text"
          sx={{
            mr: 2,
            display: { xs: "flex", sm: "none" },
            flexGrow: 1
          }}
        >
          <MenuIcon /> Giáo Xứ Vinh An
        </Typography>
        <Box
          sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}
          className="menu-box"
        >
          {pages.map((page, i) => (
            <MenuItem
              className={index === i ? "menu-item-selected" : "menu-item"}
              key={`${page.to + i}`}
              sx={{ hover: { backgroundColor: colors.blueGrey } }}
            >
              <Typography
                textAlign="center"
                className="item-text"
                component="a"
                href={page.to}
              >
                {page.text}
              </Typography>
            </MenuItem>
          ))}
        </Box>
      </Toolbar>
    </Container>
  );
};

export default MyMenu;
