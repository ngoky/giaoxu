import { Navigate, Outlet, useLocation } from "react-router";
import { newsConstant } from "../../../constants/news.constants";
// import EnhancedTable from "./components/NewsTable";
const News = () => {
  const location = useLocation();
  return (
    <div>
      {/* Admin- news <EnhancedTable /> */}
      <Outlet />
      {location.pathname === newsConstant.ADMIN_URL && <Navigate to="list" />}
    </div>
  );
};

export default News;
