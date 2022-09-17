import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Menu from '../../components/AppBar/components/AppBar';
import Body from '../../components/Body'

const drawerWidth = 240;
const NewPersistentDrawerLeft = () => {
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

export default NewPersistentDrawerLeft