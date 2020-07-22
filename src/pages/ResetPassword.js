import React from "react";
import firebase from "../config/firebase";

const ResetPassword = (email) => {
  const auth = firebase.auth();
  const emailAddress = email;

  auth
    .sendPasswordResetEmail(emailAddress)
    .then(() => {
      console.log("パスワードリセット");
    })
    .catch((err) => console.log(err));

  return <></>;
};
