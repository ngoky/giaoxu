import { VerifiedUser, HourglassEmptySharp } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { menuConstant } from "../../../constants/menu.constants";
import "./index.scss";
export const SideMenu = (props) => {
  const { open = false } = props;
  const urlPath = useLocation();
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const changeMenuItem = (item) => {
    setIndex(item.id);
    navigate(item.link);
  };

  const handlingMenu = (t) => {
    const pages = t("menus.admin", { returnObjects: true }).map((x, index) => {
      // console.log("is false", x, (x?.authorize || false) === false);
      x.id = index;
      switch (x.key) {
        case menuConstant.ADMIN_MENU_KEY.NEWS:
          x.icon = VerifiedUser;
          break;
        default:
          x.icon = HourglassEmptySharp;
          break;
      }
      return x;
    });
    return pages;
  };

  const navData = handlingMenu(t);
  useEffect(() => {
    const index = navData.find((x) => urlPath.pathname.includes(x.link));
    if (index) {
      setIndex(index.id);
    }
  }, [navData, urlPath.pathname]);

  return (
    <div className="AdminMenu">
      {navData.map((item, i) => {
        return (
          <div
            key={item.id}
            className={i === index ? "side-item-selected" : "side-item"}
            onClick={() => changeMenuItem(item)}
          >
            {item.icon && <item.icon />}
            {open && <span className="linkText">{item.text}</span>}
          </div>
        );
      })}
    </div>
  );
};
