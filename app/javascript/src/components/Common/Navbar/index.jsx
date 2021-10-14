import React from "react";

import { Clock } from "@bigbinary/neeto-icons";
import { Sidebar } from "@bigbinary/neetoui/v2/layouts";
import { Toastr } from "neetoui";
import { withRouter } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import authenticationApi from "apis/authentication";
import { resetAuthTokens } from "apis/axios";
import { useAuthDispatch } from "contexts/auth";
import { useUserState } from "contexts/user";

/* import AccountDropdown from "./AccountDropdown";
import NavItem from "./NavItem"; */

const NavBar = () => {
  const authDispatch = useAuthDispatch();
  const { user } = useUserState();

  const handleLogout = async () => {
    try {
      await authenticationApi.logout();
      authDispatch({ type: "LOGOUT" });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      Toastr.error(error);
    }
  };

  return (
    <BrowserRouter>
      <div className="flex flex-row items-start justify-start">
        <Sidebar
          navLinks={[
            {
              icon: Clock,
              label: "Notes",
              to: "/notes"
            },
            {
              icon: Clock,
              label: "Contacts",
              to: "/form-elements"
            },
            {
              icon: Clock,
              label: "Settings",
              to: "/misc"
            }
          ]}
          organizationInfo={{
            name: "neetoUI",
            subdomain: "neetoui.netlify.app"
          }}
          profileInfo={{
            dropdownProps: [
              {
                label: "Edit"
              },
              {
                label: "Logout",
                onClick: handleLogout
              }
            ],
            email: user.email,
            name: user.first_name + " " + user.last_name
          }}
        />
      </div>
    </BrowserRouter>
  );
  /*  return (
    <div className="bg-gray-100 nh-sidebar" key="sidebar">
      <div className="nh-logo">
        <div className="flex items-center justify-center w-8 h-8 rounded-md">
          <i className="text-purple-500 ri-flashlight-fill ri-2x" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-between w-full h-full">
        <div className="flex flex-col items-center justify-start w-full pt-4">
          <NavItem title="Notes" link="/notes" icon="ri-file-text-line" />
          <NavItem
            title="Settings"
            link="/settings"
            icon="ri-settings-2-line"
            subLinks={[
              { title: "Change password", link: "/my/password/edit" },
              { title: "My Profile", link: "/my/profile" }
            ]}
          />
        </div>
        <div className="mb-4">
          <AccountDropdown handleLogout={handleLogout} />
        </div>
      </div>
    </div>
  ); */
};

export default withRouter(NavBar);
