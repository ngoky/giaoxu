import Admin from "../../admin";
import News from "../../admin/pages/News";
import EditNews from "../../admin/pages/News/components/EditNews";
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
        { path: "news", component: News, routers: [{ path: "add", component: EditNews }] },
        { path: "types", component: Types }
      ]
    }
  ];
};
export default AdminRouter;
