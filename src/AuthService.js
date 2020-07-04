import React, { useState, useEffect } from "react";
import firebase from "./config/firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unmount = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);

      // unmount
      return () => {
        console.log(unmount);
      };
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
