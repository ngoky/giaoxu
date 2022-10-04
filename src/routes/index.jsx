import React from "react";
import { Route, Routes } from "react-router-dom";
import GuestRoutes from "./GuestRoutes";
import AdminRoutes from "./AdminRoutes";

const routers = [...GuestRoutes, ...AdminRoutes];
const Routers = () => {
  return (
    <Routes>
      {routers.map((element) => {
        return (
          element.routers && (
            <Route
              key={`${element.path}`}
              exact={element?.exact || false}
              path={element.path}
            >
              {element.routers.map((x) => (
                <Route
                  key={`${element.path}${x.path}`}
                  exact={element?.exact || false}
                  path={x.path}
                  element={<x.component />}
                >
                  {x.children &&
                    x.children.map((sub) => (
                      <Route
                        key={`${element.path}${sub.path}`}
                        path={sub.path}
                        element={<sub.component />}
                      />
                    ))}
                </Route>
              ))}
            </Route>
          )
        );
      })}
    </Routes>
  );
};

export default Routers