import React from "react"

import { Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material"
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { userActions } from "../../../../storage/actions";

const Account = (props) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { t } = useTranslation();
  const { auth } = props;

  const userMenu = t("menus.user-setting", { returnObjects: true }).filter(
    (x) => x.authorize === (auth !== null)
  );

  const dispatch = useDispatch();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (event) => {
    if (event === "login") {
      dispatch(userActions.login());
    } else if (event === "logout") {
      dispatch(userActions.logout());
    }
    setAnchorElUser(null);
  };
  return (
    <Toolbar disableGutters>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              alt="Remy Sharp"
              src={auth ? auth.avatar : "/static/images/avatar/2.jpg"}
            />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {userMenu &&
            userMenu.map((setting) => (
              <MenuItem
                key={setting.to}
                onClick={() => handleCloseUserMenu(setting.event)}
              >
                <Typography textAlign="center">{setting.text}</Typography>
              </MenuItem>
            ))}
        </Menu>
      </Box>
    </Toolbar>
  );
};

export default Account;