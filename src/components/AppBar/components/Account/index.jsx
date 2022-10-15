import React from "react";

import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { userActions } from "../../../../storage/actions";
import "./index.scss";

export const Account = (props) => {
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
          id="menu-user-setting"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {userMenu.length > 0 &&
            userMenu.map((setting) => (
              <MenuItem
                key={setting.to}
                onClick={() => handleCloseUserMenu(setting.event)}
              >
                <Typography textAlign="center">{setting.text}</Typography>
              </MenuItem>
            ))}
          {userMenu.length <= 0 && (
            <div className="Account">
              <form className="form">
                <TextField
                  labelText="Email"
                  id="email"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  //handleChange={this.handleChange}
                  type="text"
                />
                <CssBaseline />
                <TextField
                  labelText="Password"
                  id="password"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  // handleChange={this.handleChange}
                  type="password"
                />

                <Button
                  type="button"
                  color="primary"
                  className="form__custom-button"
                >
                  Log in
                </Button>
              </form>
            </div>
          )}
        </Menu>
      </Box>
    </Toolbar>
  );
};
