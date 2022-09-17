/* eslint-disable jsx-a11y/no-distracting-elements */
import { Box, CssBaseline, styled, Typography, useTheme } from "@mui/material"
import React from "react"
import style from './index.less'
import Banner from "../../components/Banner"
import Body from "../../components/Body"
import Menu from '../../components/AppBar/components/AppBar'
import LeftDrawer from "../../components/Drawable";
import Display from "../../components/Display"
import Slider from "./components/Sliders"

const TextSlider = styled('div', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open, width = 0, height=0 }) => ({
    flexGrow: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // display: { md: 'none', xl:'flex'},
    padding: 0,
    className: `${style.sample2}`,
    margin: 0,
    marginLeft: `-${width}px`,
    height: `${height}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      // marginLeft: 0,    
    }),
  }),
);

const Home = () => {
  const bannerHeight = 100
  const drawerWidth = 240
  const slideTextHeight = 60
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const drawerTop = bannerHeight+slideTextHeight+20 || 0

  const handleDrawer = (mark) => {
    setOpen(mark);
  };
  return (
    <Box sx={{ display:'flex'}} className={style.Home}>
      <LeftDrawer open={open} handleDrawer={handleDrawer} width={drawerWidth} banner top={drawerTop} />
      <Display theme={theme} open={open} width={drawerWidth}>
        <Banner theme={theme} open={open} width={drawerWidth}>
          <img src="https://image.shutterstock.com/image-illustration/3d-illustration-conceptual-wood-cross-600w-679159084.jpg" alt="banner" width="100%" height="100px" />
        </Banner>
        <TextSlider theme={theme} open={open} width={drawerWidth} className={style.sample2} height={slideTextHeight}><h3>Test</h3></TextSlider>
        <Box sx={{display: 'flex'}}>
          <CssBaseline />     
          <Display theme={theme} open={open} width={drawerWidth}>            
            <CssBaseline />
            <Menu theme={theme} handleDrawer={handleDrawer} check={open} width={drawerWidth} />            
            <CssBaseline />
            <Body theme={theme} open={open} width={drawerWidth}>
              <Slider theme={theme} open={open} width={drawerWidth} />
              <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                sapien faucibus et molestie ac.
              </Typography>
              <Typography paragraph>
                Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                posuere sollicitudin aliquam ultrices sagittis orci a.
              </Typography>
            </Body>
          </Display>
        </Box>
      </Display>
    </Box>
  );
  // return (old ? <PersistentDrawerLeft /> : <NewPersistentDrawerLeft />)
}

export default Home