import React from "react";
import { Route } from "react-router-dom";
import Home from "../../pages/Home";
import Contact from "../../pages/Contact";
import News from "../../pages/News";

const routers = [
  {path: '', component: <Home /> },
  {path: '/home', component: <Home />},
  {path: '/news', component: <News />},
  {path: '/contact', component: <Contact />}
]

const Routers = () => {
  return (
    <Route path="/">
      {routers.forEach(element => {
        <Route path={element.path} element={element.component} />
        })}
    </Route>
  )
}

const GuestRoutes = () => {
  return (<Routers />)
}
export default GuestRoutes