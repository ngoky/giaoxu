import { Box, CssBaseline, useTheme } from "@mui/material"
import React from "react"
import Menu from '../../components/AppBar/components/AppBar'
import Body from "../../components/Body"

// const old = false
const Contact = () => {
  const drawerWidth = 240
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawer = (mark) => {
    setOpen(mark);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Menu theme={theme} handleDrawer={handleDrawer} check={open} />
      <Body open={open} width={drawerWidth} />
    </Box>
  );
}

export default Contact