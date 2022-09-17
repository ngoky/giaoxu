const { styled } = require("@mui/material");

const Banner = styled('div', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open, width = 0 }) => ({
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
// const Banner = ({theme, open, drawerWidth}) => {
//     return(
//       <BannerStyle theme={theme} open={open} width={drawerWidth} />
//     )
// }
export default Banner