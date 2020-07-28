import React, { useState, useEffect } from "react";
import firebase from "./config/firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [groups, setGroups] = useState([]);
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

  // useEffect(() => {
  //   firebase
  //     .firestore()
  //     .collection("groups")
  //     .onSnapshot((snap) => {
  //       const getGroup = snap.docs.map((doc) => {
  //         return {
  //           name: doc.data().name,
  //           groupId: doc.data().id,
  //           id: doc.id,
  //           user: doc.data().user,
  //         };
  //       });
  //       setGroups(getGroup);
  //     });
  // }, []);

  // firebaseから情報を取得;
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

  return (
    <AuthContext.Provider value={{ user, groups, setGroups, users }}>
      {children}
    </AuthContext.Provider>
  );
};
