import { useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { HashRouter } from "react-router-dom";
import Menu from "./components/AppBar/components/AppBar";
import Banner from "./components/Banner";
import Routers from "./routes"

const drawerWidth = 240
const App = () => {
  const theme = useTheme()
  console.log('re-render APP')
  useEffect(() => {}, [])
  return (
    <>  
      <Banner theme={theme} open={undefined} width={drawerWidth}>
        <img src="https://image.shutterstock.com/image-illustration/3d-illustration-conceptual-wood-cross-600w-679159084.jpg" alt="banner" width="100%" height="100px" />
      </Banner>
      <Menu theme={theme} />
      {/* <BrowserRouter>     */}
      {/* <HashRouter> */}
      <div id="content">
        <HashRouter><Routers /></HashRouter>
      </div>
      {/* </HashRouter> */}
      {/* </BrowserRouter> */}
    </>
  )
}
export default App