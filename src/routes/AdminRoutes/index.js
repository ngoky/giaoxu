import Admin from "../../admin";
import News from "../../admin/pages/News";
import Overview from "../../admin/pages/Overview";
import Types from "../../admin/pages/Types";
const AdminRouter = (auth) => {
  if (!auth) return [];
  return [
    {
      path: "admin",
      exact: true,
      component: Admin,
      routers: [
        { path: "overview", component: Overview },
        { path: "news", component: News },
        { path: "types", component: Types }
      ]
    }
  ];
};
export default AdminRouter;
