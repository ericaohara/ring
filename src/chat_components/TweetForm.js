import React, { useState } from "react";
import firebase, { storage } from "../config/firebase";

// マテリアル
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const TweetForm = ({
  text,
  setText,
  tweets,
  addTweet,
  setEmojiType,
  emojiType,
  image,
  setImage,
  imageUrl,
  setImageUrl,
}) => {
  // ツイート追加
  const onClickTweet = (e) => {
    e.preventDefault();
    addTweet(text);
    setText("");
    setUpload(false);
  };

  // ダイアログ
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
  const [upload, setUpload] = useState(false);

  const handleImage = (e) => {
    const image = e.target.files[0];
    setImage(image);
  };

  const next = (snapshot) => {
    // 進行中のsnapshotを得る
    // アップロードの進行度を表示
    const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(percent + "% done");
    console.log(snapshot);
  };

  const error = (error) => {
    // エラーハンドリング
    console.log(error);
  };

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

  const uploadClick = () => {
    setUpload(true);
    setOpen(false);
  };

  const preview = () => {
    return (
      <div>
        <img
          src={imageUrl}
          alt="uploaded"
          style={{ height: 250, width: 500 }}
        />
      </div>
    );
  };

  return (
    <>
      <form>
        <div style={{ display: "flex", marginTop: 30 }}>
          <Avatar
            alt="Cindy Baker"
            style={{ marginRight: 30, marginLeft: 30 }}
          />
          <form>
            <textarea
              type="text"
              placeholder="140文字以内でメッセージを入力してください"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: 100, width: 400, border: "none" }}
            />
            {upload ? preview() : false}
          </form>
        </div>
        <br />

        <div style={{ marginLeft: 100 }}>
          <Button onClick={handleOpen}>
            <Icon className="fa fa-camera-retro" />
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"写真をアップロード"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                ファイルを選択から画像を選択して決定を押してください
              </DialogContentText>
              <div>
                <form onSubmit={onSubmit}>
                  <input type="file" onChange={handleImage} />
                  <button onClick={uploadClick}>決定</button>
                </form>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>戻る</Button>
            </DialogActions>
          </Dialog>

          <Button onClick={onClickEmoji}>
            <Icon className="far fa-smile" />
          </Button>
          <Button onClick={onClickTweet}>
            <Icon className="far fa-comment" />
          </Button>
        </div>
      </form>
    </>
  );
};

export default TweetForm;
