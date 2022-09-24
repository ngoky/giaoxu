import News from "../../pages/News";
import Home from "../../pages/Home";
import Contact from "../../pages/Contact";
import NotFoundPage from "../../pages/404";

const GuestRouter = [
  {
    path: "/",
    // exact: true,
    component: Home,
    routers: [
      { path: "", component: Home },
      { path: "home", component: Home },
      { path: "news", component: News },
      { path: "contact", component: Contact },
      { path: "*", component: NotFoundPage }
    ]
  },
  { path: "*", component: NotFoundPage }
];
export default GuestRouter;
