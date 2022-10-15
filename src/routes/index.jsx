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
  // const routes = useRoutes([...GuestRoutes, ...authRouters]);
  // routes.Routers(GuestRoutes);
  // console.log("Routers", routes);
  return (
    <Routes>
      {/* <Route {...routes}></Route> */}
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
              {element.routers &&
                element.routers.map((x) => (
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
                    {x.routers &&
                      x.routers.map((sub) => (
                        <Route
                          key={`${element.path}${sub.path}`}
                          path={sub.path}
                          element={
                            <ProtectedRouter user={auth}>
                              <sub.component />
                            </ProtectedRouter>
                          }
                        >
                          {sub.routers &&
                            sub.routers.map((lv3) => {
                              console.log(lv3);
                              return (
                                <Route
                                  key={`${sub.path}${lv3.path}`}
                                  path={lv3.path}
                                  element={
                                    <ProtectedRouter user={auth}>
                                      <lv3.component />
                                    </ProtectedRouter>
                                  }
                                />
                              );
                            })}
                        </Route>
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
