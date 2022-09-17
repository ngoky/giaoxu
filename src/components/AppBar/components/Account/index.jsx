import React from "react"

import { Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material"
// import MenuIcon from '@mui/icons-material/Menu';

const pages = [{
  text: 'Tin tức',
  to: '/news'
},{
  text: 'liên hệ',
  to: '/contact'
},]

const MyMenu = () => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
   
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Toolbar disableGutters>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
          keepMounted
          transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {pages.map((setting) => (
            <MenuItem key={setting.to} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{setting.text}</Typography>
            </MenuItem>
              ))}
        </Menu>
      </Box>
    </Toolbar>
  )
}

export default MyMenu