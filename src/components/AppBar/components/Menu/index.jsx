import React from "react";

import {
  Box,
  colors,
  Container,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

import "./index.less";

const pages = [
  {
    text: "Giaó xứ vinh an",
    to: "/",
  },
  {
    text: "Tin tức",
    to: "/news",
  },
  {
    text: "liên hệ",
    to: "/contact",
  },
];

const MyMenu = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Container maxWidth="xl" className="MyMenu">
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", sm: "none" },
            }}
          >
            {pages.map((page, i) => (
              <MenuItem
                key={`${page.to + i}`}
                sx={{ hover: { backgroundColor: colors.blueGrey } }}
              >
                <Typography
                  className="item-text"
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
            flexGrow: 1,
          }}
        >
          Giáo Xứ Vinh An
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
          {pages.map((page, i) => (
            <MenuItem
              className="menu-box"
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
