import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const Display = styled(Box, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open, width }) => ({
    flexDirection: "row",
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${width}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      overflow: "hidden",
    }),
  })
);

export default Display;
