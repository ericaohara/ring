import React, { useState, useEffect } from "react";
import firebase from "./config/firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 現在のログインユーザーの取得
    const unmount = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);

      // unmount
      return () => {
        console.log(unmount);
      };
    });
  }, []);

  console.log(user);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
