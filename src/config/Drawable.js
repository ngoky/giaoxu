import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Main from '../components/Body';

import AppBar from '../components/AppBar/components/AppBar';

const drawerWidth = 240;
const PersistentDrawerLeft = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  // const DrawerHeader = styled('div')(() => ({
  //   display: 'flex',
  //   alignItems: 'center',
  //   padding: theme.spacing(0, 1),
  //   // marginLeft: `${width}px`,
  //   // necessary for content to be below app bar
  //   ...theme.mixins.toolbar,
  //   justifyContent: 'flex-end',
  // }));
  const handleDrawer = (mark) => {
    setOpen(mark);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar check={open} handleDrawer={handleDrawer} theme={theme} width={drawerWidth} />
      <Main theme={theme} open={open} width={drawerWidth} />
    </Box>
  );
}

export default PersistentDrawerLeft
