import React, { useState, createContext, useEffect } from "react";


const authContextDefaultValues = {
  user: null,
  isAuthenticated: false,
  toggleAuth: () => null,
};

export const AuthContext = createContext(authContextDefaultValues);

const AuthContextProvider = ({ children }) => {
  const [userState, setUserState] = useState({
    user: null,
    isAuthenticated: false,
  });

  const toggleAuth = (user) => {
    setUserState({
      user,
      isAuthenticated: !userState.isAuthenticated,
    });
  };
  const value = { ...userState, toggleAuth };

  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem("user"));
    userStorage
      ? setUserState({ user: userStorage.name, isAuthenticated: true })
      : setUserState({ user: null, isAuthenticated: false });
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
