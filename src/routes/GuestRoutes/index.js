import News from "../../pages/News";
import Home from "../../pages/Home/home";
import Contact from "../../pages/Home/contact";
import NotFoundPage from "../../pages/404";
// import Types from "../../pages/Types";

const GuestRouter = [
  {
    path: "/",
    // exact: true,
    component: Home,
    routers: [
      { path: "", component: Home },
      { path: "home", component: Home },
      { path: "news", component: News, children: [{ path: ":id", component: News }] },
      // { path: "types", component: Types, children: [{ path: ":id", component: Types }] },
      { path: "contact", component: Contact },
      // { path: "*", component: NotFoundPage }
    ]
  },
  { path: "*", component: NotFoundPage }
];
export default GuestRouter;
