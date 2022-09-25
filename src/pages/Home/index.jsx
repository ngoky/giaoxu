import { Box, CssBaseline, styled, useTheme } from "@mui/material"
import React from "react"
import style from './index.less'
import Body from "../../components/Body"
import LeftDrawer from "../../components/Drawable";
import Display from "../../components/Display"
import Slider from "./components/Sliders"
import GroupTop from "./components/GroupTop"

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
        
        <TextSlider theme={theme} open={open} width={drawerWidth} className={style.sample2} height={slideTextHeight}><h3>Test</h3></TextSlider>
        <Box sx={{display: 'flex'}}>
          <CssBaseline />     
          <Display theme={theme} open={open} width={drawerWidth}>            
            <CssBaseline />
            {/* <Menu theme={theme} handleDrawer={handleDrawer} check={open} width={drawerWidth} />             */}
            <CssBaseline />
            <Body theme={theme} open={open} width={drawerWidth}>
              <Slider theme={theme} open={open} width={drawerWidth} />
              <GroupTop />
            </Body>
          </Display>
        </Box>
      </Display>
    </Box>
  );
}

export default Home