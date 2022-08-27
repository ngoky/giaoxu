import React from "react"

import { Box, Menu, Typography } from "@mui/material"

const pages = [{
  text: 'Giáo xứ vinh an',
  to: '/'
},{
  text: 'Tin tức',
  to: '/news'
},{
  text: 'liên hệ',
  to: '/contact'
},]

const RenderMenu = () => {
    return (
        pages.map((x) => (
        //   <MenuItem key={x.text} component="div">
          <Typography key={x.text} textAlign="center" href={x.to}>{x.text}</Typography>
        //   </MenuItem>
      )))
}

const MyMenu = (open) => {
    const [anchorElNav] = React.useState(null)
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      <Menu
        id="menu-app-bar"
        anchorEl={anchorElNav}
        anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
        keepMounted
        transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
        open={Boolean(open)}
      // onClose={handleCloseNavMenu}
        sx={{
                display: { xs: 'block', md: 'none' },
        }}
      >
        <RenderMenu />
      </Menu>
      <RenderMenu />
    </Box>
  )
}

export default MyMenu