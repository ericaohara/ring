import React, { useState, useEffect, useContext } from "react";
import firebase from "../config/firebase";
import { AuthContext } from "../AuthService";
import TweetForm from "./TweetForm";
import TweetList from "./TweetList";
import { Segment } from "semantic-ui-react";

// 絵文字
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

const ChatApp = () => {
  const user = useContext(AuthContext);
  // ツイート管理
  const [text, setText] = useState("");
  const [tweets, setTweets] = useState([]);

  const addTweet = (text) => {
    if (text.trim() === "" && upload === false) {
      alert("メッセージを入力してください");
    } else if (text.length > 140) {
      alert("メッセージは140文字以内で入力してください");
    }
    setImageUrl("");
  };

  // 画像
  const [images, setImages] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [upload, setUpload] = useState(false);

  // 絵文字
  const [emojiType, setEmojiType] = useState(null);

  const onEmojiSelect = (emoji) => {
    // 絵文字一覧の開閉
    setEmojiType(!emojiType);
    // 絵文字を表示させるようにする
    setText(text + emoji.native);
  };

  // ユーザーをコレクションで管理しようとした
  // const db = firebase.firestore();

  // useEffect(() => {
  //   db.collection("users")
  //     .doc()
  //     .set({
  //       content: text,
  //       user: {
  //         id: user.uid,
  //         name: user.displayName,
  //         avatar: user.photoURL,
  //       },
  //     })
  //     .then(() => {
  //       console.log("ユーザー情報追加成功");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // });

  // admin
  //   .auth()
  //   .getUser(uid)
  //   .then(() => {
  //     console.log("ユーザー情報取得");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  return (
    <>
      <TweetForm
        text={text}
        setText={setText}
        tweets={tweets}
        setTweets={setTweets}
        addTweet={addTweet}
        setEmojiType={setEmojiType}
        emojiType={emojiType}
        images={images}
        setImages={setImages}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        upload={upload}
        setUpload={setUpload}
      />
      {emojiType && (
        <Picker
          onClick={(emoji) => onEmojiSelect({ ...emoji, emojiType })}
          i18n={{
            search: "検索",
            categories: {
              search: "検索結果",
              recent: "よく使う絵文字",
              people: "顔 & 人",
              nature: "動物 & 自然",
              foods: "食べ物 & 飲み物",
              activity: "アクティビティ",
              places: "旅行 & 場所",
              objects: "オブジェクト",
              symbols: "記号",
              flags: "旗",
              custom: "カスタム",
            },
          }}
          style={{
            position: "absolute",
            zIndex: "20",
          }}
          native
        />
      )}
      <Segment>
        {/* <Comment.Group className="main__tweet" /> */}
        <TweetList tweets={tweets} setTweets={setTweets} imageUrl={imageUrl} />
      </Segment>
    </>
  );
};

export default ChatApp;
