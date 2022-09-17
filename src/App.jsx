import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import News from "./pages/News";
// import GuestRoutes from "./routes/GuestRoutes";

// const routers = [
//   {path: '/', component: Home },
//   // {path: '/home', component: <Home />},
//   // {path: '/news', component: <News />},
//   // {path: '/contact', component: <Contact />}
// ]

const Routers = () => {
  // return (
  //   <Routes>
  //     {/* <Route path="/" component={<App />}> */}
  //     {routers.forEach(element => {
  //       <Route path={element.path} element={<Home />} />
  //     })}
  //     {/* </Route> */}
  //     {/* <GuestRoutes /> */}
  //     {/* <Route path="/">
  //       {routers.forEach(element => {
  //         <Route path={element.path} element={<element.component />} />
  //       })}
  //     </Route> */}
  //   </Routes>
  // )

  return (<Routes><Route path="/" element={<Home />} /><Route path="/news" element={<News />} /><Route path="/contact" element={<Contact />} /></Routes>);
}

const App = () => {
  return (<BrowserRouter><Routers /></BrowserRouter>)
}
export default App