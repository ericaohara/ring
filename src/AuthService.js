import React, { useState, useEffect, useLayoutEffect } from "react";
import firebase from "./config/firebase";
import { Redirect } from "react-router-dom";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [groups, setGroups] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 現在のログインユーザーの取得
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser == null) {
        setLoading(false);
      }
    });
    // unmount
    return () => {
      console.log("unmount");
    };
  }, []);

  /** dbのuser情報を取得する関数 */
  useLayoutEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .onSnapshot((snapshot) => {
        const userContent = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        setUsers(userContent);
      });
  }, []);

  /** groupを取得する関数 */
  // ログインユーザーがいるグループのみ取得
  useLayoutEffect(() => {
    if (user) {
      firebase
        .firestore()
        .collection("groups")
        .where("users", "array-contains", user.uid)
        .onSnapshot((snapshot) => {
          const groupContent = snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          });
          setCurrentGroup(groupContent[0].id);
          setGroups(groupContent);
        });
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        groups,
        setGroups,
        users,
        currentGroup,
        setCurrentGroup,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
