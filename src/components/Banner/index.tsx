import { styled } from "@mui/material"

export const Banner = styled('div', { shouldForwardProp: (prop: string) => prop !== 'open' })(
  ({ theme, open, width = 0 }:{ theme: any, open?: boolean, width?:number}) => ({
    flexGrow: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // display: { md: 'none', xl:'flex'},
    padding: 0,
    marginLeft: `-${width}px`,
    height: '100px',
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),      
    }),
  }),
);