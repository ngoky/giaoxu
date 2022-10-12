import { Outlet, useLocation, Navigate } from "react-router-dom";

const Admin = () => {
  const { pathname } = useLocation();
  return (
    <div>
      Admin
      <Outlet id="ma-no" />
      Footer
      {pathname === "/admin" && <Navigate to="news" />}
    </div>
  );
};
export default Admin;
