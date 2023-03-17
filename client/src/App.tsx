import React from "react";

import { Refine, AuthProvider } from "@pankod/refine-core";
import {
    notificationProvider,
    RefineSnackbarProvider,
    CssBaseline,
    GlobalStyles,
    ReadyPage,
    ErrorComponent,
} from "@pankod/refine-mui";

import { AccountCircleOutlined } from "@mui/icons-material";
import { PeopleOutline } from "@mui/icons-material";
import { ChatBubbleOutline } from "@mui/icons-material";
import { StarOutlineRounded } from "@mui/icons-material";
import { VillaOutlined } from "@mui/icons-material";

import dataProvider from "@pankod/refine-simple-rest";
import { MuiInferencer } from "@pankod/refine-inferencer/mui";
import routerProvider from "@pankod/refine-react-router-v6";
import axios, { AxiosRequestConfig } from "axios";
import { ColorModeContextProvider } from "contexts";
import { Title, Sider, Layout, Header } from "components/layout";
import { CredentialResponse } from "./interfaces/google";
import { parseJwt } from "utils/parse-jwt";

import {
    Login,
    Home,
    Agents,
    MyProfile,
    PropertyDetails,
    AllProperties,
    CreateProperty,
    AgentProfile,
    EditProperty,
} from "pages";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (request.headers) {
        request.headers["Authorization"] = `Bearer ${token}`;
    } else {
        request.headers = {
            Authorization: `Bearer ${token}`,
        };
    }

    return request;
});

axiosInstance.interceptors.response.use((response) => {
    return response
  }, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = await refreshAccessToken();            
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  });

  const refreshAccessToken = async() => {
    try {
        const response = await fetch("http://localhost:3500/auth/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response
  } catch (err) {
    console.log(err);
  }
}

function App() {
    const authProvider: AuthProvider = {
        login: async ({accessToken}) => {
            const profileObj = accessToken ? parseJwt(accessToken) : null;
            
            const data = JSON.parse(JSON.stringify(profileObj)).UserInfo;
            localStorage.setItem(
                "user", JSON.stringify({...data})
            );
            localStorage.setItem("token", `${accessToken}`);
            // localStorage.setItem("use)
            return Promise.resolve();
        },
        logout: async() => {
            const token = localStorage.getItem("token");

            if (token && typeof window !== "undefined") {
                const resposne = fetch("http://localhost:3500/auth/logout",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                      },
                })
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                axios.defaults.headers.common = {};
                window.google?.accounts.id.revoke(token, () => {
                    return Promise.resolve();
                });

            }

            return Promise.resolve();
        },
        checkError: () => Promise.resolve(),
        checkAuth: async () => {
            const token = localStorage.getItem("token");

            if (token) {
                return Promise.resolve();
            }
            return Promise.reject();
        },

        getPermissions: () => Promise.resolve(),
        getUserIdentity: async () => {
            const user = localStorage.getItem("user");
            if (user) {
                return Promise.resolve(JSON.parse(user));
            }
        },
    };

    return (
        <>
            <ColorModeContextProvider>
                <CssBaseline />
                <GlobalStyles
                    styles={{ html: { WebkitFontSmoothing: "auto" } }}
                />
                <RefineSnackbarProvider>
                    <Refine
                        dataProvider={dataProvider("http://localhost:3500", axiosInstance)}
                        notificationProvider={notificationProvider}
                        ReadyPage={ReadyPage}
                        catchAll={<ErrorComponent />}
                        resources={[
                            {
                                name: "properties",
                                list: AllProperties,
                                show: PropertyDetails,
                                create: CreateProperty,
                                edit: EditProperty,
                                icon: <VillaOutlined />,
                            },
                            {
                                name: "agents",
                                list: Agents,
                                show: AgentProfile,
                                icon: <PeopleOutline />,
                            },
                            {
                                name: "reviews",
                                list: Home,
                                icon: <StarOutlineRounded />,
                            },
                            {
                                name: "messages",
                                list: Home,
                                icon: <ChatBubbleOutline />,
                            },
                            {
                                name: "my-profile",
                                options: { label: "My Profile" },
                                list: MyProfile,
                                icon: <AccountCircleOutlined />,
                            },
                        ]}
                        Title={Title}
                        Sider={Sider}
                        Layout={Layout}
                        Header={Header}
                        routerProvider={routerProvider}
                        authProvider={authProvider}
                        LoginPage={Login}
                        DashboardPage={Home}
                    />
                </RefineSnackbarProvider>
            </ColorModeContextProvider>
        </>
    );
}

export default App;
