import React, { useState, useContext } from "react";
import TweetForm from "./TweetForm";
import TweetList from "./TweetList";
import { Segment } from "semantic-ui-react";

// 絵文字
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

const ChatApp = () => {
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
  const [image, setImage] = useState("");
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
        image={image}
        setImage={setImage}
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
        <TweetList tweets={tweets} setTweets={setTweets} />
      </Segment>
    </>
  );
};

export default ChatApp;
