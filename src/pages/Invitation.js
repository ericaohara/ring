import React, { useEffect } from "react";

// 招待を受けて遷移するページ
const Invitation = () => {
  useEffect(() => {
    //URLからグループIDを取得する
    function getParam(name, url) {
      // urlを遷移
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return "";
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    //firebaseAuthからcurrentUserを取得する
    //currentUserからユーザーを取得する(ユーザーのリファレンス)
    //グループIDにuserのリファレンスを追加する
  }, []);
  return <></>;
};

export default Invitation;
