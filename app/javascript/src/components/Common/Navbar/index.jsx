import React from "react";

import { Clock } from "@bigbinary/neeto-icons";
import { Sidebar } from "@bigbinary/neetoui/v2/layouts";
import { Toastr } from "neetoui";
import { withRouter, useHistory } from "react-router-dom";

import authenticationApi from "apis/authentication";
import { resetAuthTokens } from "apis/axios";
import { useAuthDispatch } from "contexts/auth";
import { useUserState } from "contexts/user";

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
          ],
          email: user.email,
          name: user.first_name + " " + user.last_name
        }}
      />
    </div>
  );
};

export default withRouter(NavBar);
