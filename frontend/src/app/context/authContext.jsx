"use client"
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  // DEFAULTS HEADERs
  axios.defaults.headers.common["Authorization"] = auth?.token;
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const data = localStorage.getItem("userInfo");
    if (data) {
      const parsedData = JSON.parse(data);
      setAuth({ ...auth, user: parsedData });
    }
  }, [auth?.token]);

  return (
    <>
      <AuthContext.Provider value={[auth, setAuth]}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider, AuthContext };
