import React from "react";

import { Dashboard, UserCircle, Settings } from "@bigbinary/neeto-icons";
import { Sidebar } from "@bigbinary/neetoui/v2/layouts";
import { Toastr } from "neetoui";
import { withRouter, useHistory } from "react-router-dom";

import authenticationApi from "apis/authentication";
import { resetAuthTokens } from "apis/axios";
import { useAuthDispatch } from "contexts/auth";
import { useUserState } from "contexts/user";
import { setToLocalStorage } from "helpers/storage";

const NavBar = () => {
  let history = useHistory();
  const authDispatch = useAuthDispatch();
  const { user } = useUserState();

  const handleLogout = async () => {
    try {
      setToLocalStorage("context", null);
      await authenticationApi.logout();
      authDispatch({ type: "LOGOUT" });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      Toastr.error(error);
    }
  };
  const redirect = () => {
    history.push("/my/profile");
  };

  return (
    <div className="flex flex-row items-start justify-start">
      <Sidebar
        navLinks={[
          {
            icon: Dashboard,
            label: "Notes",
            to: "/notes"
          },
          {
            icon: UserCircle,
            label: "Contacts",
            to: "/contacts"
          },
          {
            icon: Settings,
            label: "Settings",
            to: "/my/password/edit"
          }
        ]}
        profileInfo={{
          dropdownProps: [
            {
              label: "Edit",
              onClick: redirect
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
  );
};

export default withRouter(NavBar);
