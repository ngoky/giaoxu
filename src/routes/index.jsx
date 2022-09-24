import React from "react";
import { Routes, Route } from "react-router-dom";
import GuestRoutes from "./GuestRoutes";
import AdminRoutes from "./AdminRoutes";

const routers = [...GuestRoutes, ...AdminRoutes]
const Routers = () => {
  return (
    <Routes>
      {routers.map(element => {
        return (
          element.routers &&
          <Route key={`${element.path}`} exact={element.exact} path={element.path}>
            {element.routers.map(((x) => (<Route key={`${element.path}${x.path}`} path={x.path} element={<x.component />} />)))}
          </Route>
        )
      })}
    </Routes>
  )
}

export default Routers