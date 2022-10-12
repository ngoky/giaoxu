import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import GuestRoutes from "./GuestRoutes";
import AdminRoutes from "./AdminRoutes";

const ProtectedRouter = ({ user, redirectPath = "/home", children }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

const Routers = (props) => {
  const { auth } = props;
  const authRouters = AdminRoutes(auth);
  // console.log("Routers", auth);
  return (
    <Routes>
      {/* <GuestRoute data={GuestRoutes} /> */}
      {GuestRoutes.map((element) => {
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
      {authRouters.map((element) => {
        return (
          element.routers && (
            <Route
              key={`${element.path}`}
              // exact={element?.exact || false}
              path={element.path}
              element={
                <ProtectedRouter user={auth}>
                  <element.component />
                </ProtectedRouter>
              }
            >
              {element.routers.map((x) => (
                <Route
                  key={`${element.path}${x.path}`}
                  exact={element?.exact || false}
                  path={x.path}
                  element={
                    <ProtectedRouter user={auth}>
                      <x.component />
                    </ProtectedRouter>
                  }
                >
                  {x.children &&
                    x.children.map((sub) => (
                      <Route
                        key={`${element.path}${sub.path}`}
                        path={sub.path}
                        element={
                          <ProtectedRouter user={auth}>
                            <sub.component />
                          </ProtectedRouter>
                        }
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

export default Routers;
