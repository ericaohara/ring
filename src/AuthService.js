import React, { useState, useEffect } from "react";
import firebase from "./config/firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [groups, setGroups] = useState("");
  const [currentGroup, setCurrentGroup] = useState(null);

  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 現在のログインユーザーの取得
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      console.log(firebaseUser, "user");
      setUser(firebaseUser);
    });
    // unmount
    return () => {
      console.log("unmount");
    };
  }, []);

  /** dbのuser情報を取得する関数 */
  useEffect(() => {
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

  /**　サブコレクションのgroupを取得する関数 */
  useEffect(() => {
    if (!user) {
      return;
    }
    firebase
      .firestore()
      .collection(`users/${user.uid}/groups`)
      .onSnapshot((snapshot) => {
        const groupContent = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
          };
        });
        console.log(groupContent);
        setCurrentGroup(groupContent[0].groupId);
        setGroups(groupContent);
      });
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
