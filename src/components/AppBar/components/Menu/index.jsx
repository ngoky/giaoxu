import React from "react"

import { Box, colors, Container, Menu, MenuItem, Toolbar, Typography } from "@mui/material"

const pages = [{
  text: 'Tin tức',
  to: '/news'
},{
  text: 'liên hệ',
  to: '/contact'
},]

const MyMenu = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null)
    // const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Container maxWidth='xl'>
      <Toolbar disableGutters>
        <Typography
          variant="h7"
          noWrap
          color="inherit"
          component="a"
          href="/"
          sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 400,
              // letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
        >
          Giáo Xứ Vinh An
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <Menu
            id="menu-appbar"
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
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
                display: { xs: 'block', md: 'none' },
              }}
          >
            {pages.map((page, i) => (
              <MenuItem key={`${page.to + i}`} sx={{hover: { backgroundColor: colors.blueGrey }}}>
                <Typography textAlign="center" component='a' href={page.to}>{page.text}</Typography>
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
          sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
        >
          Giáo Xứ Vinh An
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page, i) => (
            <MenuItem key={`${page.to + i}`} sx={{hover: { backgroundColor: colors.blueGrey }}}>
              <Typography textAlign="center" component='a' href={page.to}>{page.text}</Typography>
            </MenuItem>
            // <Button
            //   key={page.to}
            //   onClick={handleCloseNavMenu}
            //   sx={{ my: 2, color: 'white', display: 'block' }}
            // >
            //   {page.text}
            // </Button>
            ))}
        </Box>
      </Toolbar>
    </Container>
  )
}

export default MyMenu