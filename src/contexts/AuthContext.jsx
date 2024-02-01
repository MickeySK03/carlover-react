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
  const [loading, setLoading] = useState(true);
  const [allCar, setAllCar] = useState([]);

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

  useEffect(() => {
    if (authUser) {
      axios
        .get("/allcars")
        .then((res) => {
          setAllCar(res.data.car);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoading(false);
    }
  }, [authUser, setAllCar]);

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

  const deleteCar = async (carId) => {
    try {
      await axios.delete(`/allcars/${carId}`);
      setAllCar(allCar.filter((el) => el.id !== carId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        authUser,
        initialLoading,
        loading,
        setLoading,
        logout,
        allCar,
        setAllCar,
        deleteCar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
