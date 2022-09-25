import React from "react"
import { useTheme, Box, CssBaseline, Typography } from "@mui/material"
import Display from "../../components/Display"
import Body from "../../components/Body"
import LeftDrawer from "../../components/Drawable"

// const old = false
const News = () => {
    const drawerWidth=240
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawer = (mark) => {
        setOpen(mark);
    };
    return (
      <Box sx={{ display:'flex'}}>
        <LeftDrawer open={open} handleDrawer={handleDrawer} width={drawerWidth} />
        <Display theme={theme} open={open} width={drawerWidth}>
          {/* <BannerStyle theme={theme} open={open} width={drawerWidth}>
            <img src="https://image.shutterstock.com/image-illustration/3d-illustration-conceptual-wood-cross-600w-679159084.jpg" alt="banner" width="100%" height="100px" />
          </BannerStyle> */}
          <Box sx={{display: 'flex'}}>
            <CssBaseline />     
            <Display theme={theme} open={open} width={drawerWidth}>
              <CssBaseline />
              <CssBaseline />
              <Body theme={theme} open={open} width={drawerWidth}>
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

export default News