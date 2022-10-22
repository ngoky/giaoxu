import { styled } from '@mui/material/styles';

export const Body = styled('main', { shouldForwardProp: (prop: any) => prop !== 'open' })(
  ({ theme, open }: {theme: any, open?: boolean}) => ({
    flexGrow: 1,
    display:'flex',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // width: '100%',
    // marginLeft: `-${width}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);
