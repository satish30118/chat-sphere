"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState();
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);

  const router = useRouter();
  // DEFAULTS HEADERs
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
  axios.defaults.headers.common["Authorization"] = `Bearer ${auth?.token}`;
  axios.defaults.headers.common["Content-Type"] = "application/json";

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setAuth(userInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <>
      <AuthContext.Provider
        value={{
          auth,
          setAuth,
          chats,
          setChats,
          selectedChat,
          setSelectedChat,
          notification,
          setNotification,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider, AuthContext };
