import CIcon from "@coreui/icons-react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import React from "react";
import {getImage} from "../store/user/select";
import {useSelector} from "react-redux";

const AVATAR_URL = "http://localhost:8000/uploads/avatars/";

const HeaderDropdown = () => {
  const image_url = useSelector(getImage);


  const handleLogout = () => {
    if (localStorage.getItem("pv-access-token")) {
      localStorage.removeItem("pv-access-token");
    }
    if (localStorage.getItem("pv-refresh-token")) {
      localStorage.removeItem("pv-refresh-token");
    }
    window.location = "/admin/auth/login";
  };
  console.log(AVATAR_URL+image_url);
  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={AVATAR_URL+image_url}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Settings</strong>
        </CDropdownItem>
        <CDropdownItem to="/admin/profile">
          <CIcon name="cil-user" className="mfe-2" />
          Profile
        </CDropdownItem>

        <CDropdownItem divider />
        <CDropdownItem onClick={handleLogout}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default HeaderDropdown;
