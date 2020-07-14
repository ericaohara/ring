import React, { useState } from "react";
import firebase, { storage } from "../config/firebase";

import { Modal, Segment, Input, Button, Form, Image } from "semantic-ui-react";

const TweetForm = ({
  text,
  setText,
  addTweet,
  setEmojiType,
  emojiType,
  image,
  setImage,
  imageUrl,
  setImageUrl,
  upload,
  setUpload,
}) => {
  // firebase
  // const [message, setMessage] = useState("");

  // ツイート追加
  const onClickTweet = (e) => {
    e.preventDefault();
    addTweet(text);
    setText("");
    setUpload(false);
  };

  // ダイアログ
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 絵文字
  const onClickEmoji = () => {
    // クリック時に一覧が開かれていたら閉じる
    if (emojiType) {
      setEmojiType(null);
      // クリック時に一覧が閉じていたら開く
    } else {
      setEmojiType("emoji");
    }
  };

  // 画像
  const handleImage = (e) => {
    const image = e.target.files[0];
    setImage(image);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (image === "") {
      console.log("ファイルが選択されていません");
    }

    // アップロード処理
    const uploadTask = storage.ref(`/images/${image.name}`).put(image);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      next,
      error,
      complete
    );
  };

  const next = (snapshot) => {
    // 進行中のsnapshotを得る
    // アップロードの進行度を表示
    const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(percent + "% done");
    console.log(snapshot);
  };

  // エラーハンドリング
  const error = (err) => console.log(err);

  const complete = () => {
    // 完了後の処理
    // 画像表示のため、アップロードした画像のURLを取得
    storage
      .ref("images")
      .child(image.name)
      .getDownloadURL()
      .then((fireBaseUrl) => {
        setImageUrl(fireBaseUrl);
      });
  };

  const uploadClick = () => {
    setUpload(true);
    setOpen(false);
    console.log(imageUrl);
  };

  const preview = () => {
    return (
      <img src={imageUrl} alt="uploaded" style={{ height: 250, width: 500 }} />
    );
  };

  return (
    <>
      <Segment className="tweet__form">
        <Image avatar src="/" />
        <Form>
          <Input
            placeholder="140文字以内でメッセージを入力してください"
            fluid
            transparent
            focus
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {upload ? preview() : false}
          <br />
          <Button
            basic
            circular
            icon="camera"
            iconPosition="right"
            size="medium"
            onClick={handleOpen}
          />

          <Button
            basic
            circular
            icon="smile outline"
            iconPosition="right"
            size="medium"
            onClick={onClickEmoji}
          />
          <Button
            basic
            circular
            icon="paper plane outline"
            iconPosition="right"
            size="medium"
            onClick={onClickTweet}
          >
            つぶやく
          </Button>
        </Form>
      </Segment>

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>写真をアップロード</Modal.Header>
        <Modal.Content>
          ファイルを選択から画像を選択して決定を押してください
          <form onSubmit={onSubmit}>
            <Input type="file" onChange={handleImage} />
            <Button basic color="green" onClick={uploadClick}>
              決定
            </Button>
            <Button basic color="red" onClick={handleClose}>
              戻る
            </Button>
          </form>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default TweetForm;
