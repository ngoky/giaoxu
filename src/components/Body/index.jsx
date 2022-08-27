import React from 'react';
import { styled } from '@mui/material/styles';
import DrawerHeader from '../DrawerHeader';

// const drawerWidth = 240
const MainStyle = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open, width }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${width}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);
const Main = ({theme, open, width}) => {
  return(
    <MainStyle theme={theme} open={open} width={width}>
      <DrawerHeader theme={theme} />
    </MainStyle>)
}

export default Main