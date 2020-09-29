import React, { useState, useEffect, useContext } from "react";
import firebase, { storage } from "../config/firebase";
import { AuthContext } from "../AuthService";

import {
  Modal,
  Segment,
  Input,
  Button,
  Form,
  Image,
  TextArea,
  List,
} from "semantic-ui-react";

const TweetForm = ({
  text,
  setText,
  setTweets,
  setEmojiType,
  emojiType,
  images,
  setImages,
  imageUrl,
  setImageUrl,
  upload,
  setUpload,
}) => {
  const { user, users, currentGroup } = useContext(AuthContext);

  // firebase
  const db = firebase.firestore();

  /** firebaseに追加した値を取得 */
  useEffect(() => {
    firebase
      .firestore()
      .collection("chat")
      // 昇順
      .orderBy("createdAt", "desc")
      .onSnapshot(async (snapshot) => {
        const message = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const userRef = await doc.data().createUser;
            return {
              ...doc.data(),
              id: doc.id,
              createdAt: doc.data().createdAt.toDate().toString(),
              createUser: userRef,
            };
          })
        );
        setTweets(message);
      });
  }, []);

  /** アバター取得 */
  const displayAvatar = () => {
    if (users && user) {
      const avatar = users.find((pick) => pick.id === user.uid);
      return avatar.avatar;
    }
  };

  // firebaseにデータを追加
  const data = () => {
    const userRef = db.collection("users").doc(user.uid);
    db.collection("chat")
      .doc()
      .set({
        // タイムスタンプ
        createdAt: new Date(),
        content: text,
        image: imageUrl,
        groupId: currentGroup,
        createUser: userRef,
      })
      .then(() => {
        console.log("データ追加成功");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ツイート追加
  const onClickTweet = (e) => {
    e.preventDefault();
    if (text.trim() === "" && upload === false) {
      alert("メッセージを入力してください");
    } else if (text.length > 140) {
      alert("メッセージは140文字以内で入力してください");
    } else {
      data();
    }
    setText("");
    setUpload(false);
    setImageUrl("");
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

  /** 画像アップロード */
  const handleImage = (e) => {
    const image = e.target.files[0];
    setImages(image);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (images === "") {
      alert("ファイルが選択されていません");
      return;
    }

    setUpload(true);
    setOpen(false);
    // アップロード処理
    const uploadTask = storage.ref(`/images/${images.name}`).put(images);
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
      .child(images.name)
      .getDownloadURL()
      .then((fireBaseUrl) => {
        setImageUrl(fireBaseUrl);
        console.log(fireBaseUrl);
      });
  };

  const preview = () => {
    return (
      <>
        <Button
          circular
          basic
          icon="times"
          size="mini"
          color="gray"
          onClick={prevDelete}
        />
        <Image size="small" src={imageUrl} alt="uploaded" />
      </>
    );
  };

  const prevDelete = () => {
    setUpload(false);
    // firebase画像消し方
    const desertRef = storage.ref(`/images/${images.name}`);
    desertRef
      .delete()
      .then(() => {
        console.log("画像削除成功");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Segment>
        <List>
          <List.Item>
            <Image avatar src={displayAvatar()} size="tiny" />
            <List.Content>
              <Form>
                <TextArea
                  placeholder="140文字以内でメッセージを入力してください"
                  maxLength="140"
                  style={{ resize: "none", border: "none" }}
                  fluid
                  transparent
                  focus
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                {upload ? preview() : null}
              </Form>
            </List.Content>
          </List.Item>
        </List>

        <br />
        <div className="form__btn">
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
        </div>
      </Segment>

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>{"写真をアップロード"}</Modal.Header>
        <Modal.Content>
          ファイルを選択から画像を選択して決定を押してください
          <Form onSubmit={onSubmit}>
            <Input type="file" onChange={handleImage} className="input__file" />
            <Button basic color="red" onClick={handleClose}>
              戻る
            </Button>
            <Button basic color="green" onClick={onSubmit}>
              決定
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default TweetForm;
