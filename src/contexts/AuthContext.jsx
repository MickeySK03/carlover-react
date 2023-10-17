import { createContext, useEffect, useState } from "react";
import axios from "../config/axios";
import {
  addAcessToken,
  getAccessToken,
  removeAccessToken,
} from "../utils/local-storage";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (getAccessToken()) {
      axios
        .get("/auth/me")
        .then((res) => {
          setAuthUser(res.data.user);
        })
        .finally(() => {
          setInitialLoading(false);
        });
    } else {
      setInitialLoading(false);
    }
  }, []);

  const login = async (credential) => {
    const res = await axios.post("/auth/login", credential);
    addAcessToken(res.data.accessToken);
    setAuthUser(res.data.user);
  };
  //   const register = async (registerInputObject) => {
  //     // const res =
  //     await axios.post("/auth/register", registerInputObject);
  //     // addAcessToken(res.data.accessToken);
  //     // setAuthUser(res.data.user);
  //   };

  const logout = () => {
    removeAccessToken();
    setAuthUser(null);
  };
  console.log(authUser);
  return (
    <AuthContext.Provider value={{ login, authUser, initialLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
