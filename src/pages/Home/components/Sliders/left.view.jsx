import { styled, Container, useTheme } from "@mui/material";
import React from "react"

const Layout = styled(Container, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    flexGrow: 1,
    margin: 0,
    // padding: theme.spacing(3),
    boxSizing: 'border-box',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }),
);
const LeftView = (props) => {
    const theme = useTheme()
    const { post } = props
    return (post && <Layout theme={theme}>{post.title}</Layout>)
}
export default LeftView