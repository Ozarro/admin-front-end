import CIcon from "@coreui/icons-react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import React from "react";
import {getImage, getImageFromProfile, getUserData} from "../store/user/select";
import {useSelector} from "react-redux";
import {BACK_END_URL} from "../api/index";

const AVATAR_URL = BACK_END_URL.DEFAULT_FILE_URL;

const HeaderDropdown = () => {
  const image_url1 = useSelector(getImage);
  const image_url2 = useSelector(getImageFromProfile);
  const userData = useSelector(getUserData);
  let image_url;
  if(image_url1 != undefined) {
    image_url = image_url1;
  }else{
    image_url = image_url2;
  }


  const handleLogout = () => {
    if (localStorage.getItem("ozarro-access-token")) {
      localStorage.removeItem("ozarro-access-token");
    }
    if (localStorage.getItem("ozarro-refresh-token")) {
      localStorage.removeItem("ozarro-refresh-token");
    }
    window.location = "/admin/auth/login";
  };
  console.log(AVATAR_URL+image_url);
  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar-xl">
          <CImg
            src={AVATAR_URL+image_url}
            className="c-avatar-xl"
            alt="admin@bootstrapmaster.com"
          />
        </div>
        <div className="ml-2 h7">
          Hey {(userData) ? userData.name : ""}
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Settings</strong>
        </CDropdownItem>

        <CDropdownItem>
          <div className="c-avatar-xl">
            <CImg
                src={AVATAR_URL+image_url}
                className="c-avatar-xl"
                alt="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
            />
          </div>
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
