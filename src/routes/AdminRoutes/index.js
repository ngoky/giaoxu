import Admin from "../../admin/pages/Home";
import News from "../../admin/pages/News";
import Types from "../../admin/pages/Types";
const AdminRouter = (auth) => {
  if (!auth) return []
  return [
    {
      path: "admin",
      // exact: true,
      component: Admin,
      routers: [
        // { path: "", component: Admin },
        { path: "news", component: News },
        { path: "types", component: Types }
      ]
    }
  ]
}
export default AdminRouter;
