import { Abc, TravelExplore, BarChart, Settings } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.scss";
const adminUrl = "/admin";
const navData = [
  {
    id: 0,
    icon: <Abc />,
    text: "Home",
    link: `${adminUrl}/news`,
  },
  {
    id: 1,
    icon: <TravelExplore />,
    text: "Explore",
    link: `${adminUrl}/types`,
  },
  {
    id: 2,
    icon: <BarChart />,
    text: "Statistics",
    link: `${adminUrl}/types`,
  },
  {
    id: 3,
    icon: <Settings />,
    text: "Settings",
    link: `${adminUrl}/types`,
  },
];
export const SideMenu = (props) => {
  const { open = false } = props;
  const urlPath = useLocation();
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const index = navData.find((x) => urlPath.pathname.includes(x.link));
    if (index) {
      setIndex(index.id);
    }
  }, [urlPath.pathname]);

  const changeMenuItem = (item) => {
    setIndex(item.id);
    navigate(item.link);
  };

  return (
    <div className="AdminMenu">
      {navData.map((item, i) => {
        return (
          <div
            key={item.id}
            className={i === index ? "side-item-selected" : "side-item"}
            onClick={() => changeMenuItem(item)}
          >
            {item.icon}
            {open && <span className="linkText">{item.text}</span>}
          </div>
        );
      })}
    </div>
  );
};
