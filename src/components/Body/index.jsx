import { styled } from '@mui/material/styles';

const Body = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
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
// const Main = ({open, width}) => {
//   const theme = useTheme()
//   return(
//     <MainStyle theme={theme} open={open} width={width} />
//   )
// }

export default Body