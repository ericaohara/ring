import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthService";
import firebase, { storage } from "../config/firebase";

import {
  Button,
  Modal,
  Icon,
  Image,
  Form,
  Input,
  Grid,
} from "semantic-ui-react";

const ProfileModal = ({ modal, closeModal }) => {
  const [avatarImage, setAvatarImage] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birth, setBirth] = useState("");
  const [reset, setReset] = useState("");
  const [passwordModal, setPasswordModal] = useState(false);
  const [upload, setUpload] = useState(false);

  const { user, users } = useContext(AuthContext);
  const db = firebase.firestore();

  const openPasswordModal = () => setPasswordModal(true);
  const closePasswordModal = () => setPasswordModal(false);

  // firebaseへ情報を追加
  const userDetails = () => {
    db.collection("users")
      .doc()
      .set({
        user: {
          id: user.uid,
          name,
          avatar: avatarUrl,
          birth: birth,
        },
      });
  };

  const handlePreview = (e) => {
    const file = e.target.files[0];
    setAvatarImage(file);
  };

  const onBtnClick = (name, birth) => {
    // プロフィール
    const information = firebase.auth().currentUser;

    userDetails();

    if (!name || !avatarImage || !birth) {
      closeModal();
    }

    if (name) {
      db.collection("users").doc().update({
        name,
      });

      information
        .updateProfile({
          // 名前変更
          displayName: name,
        })
        .then(() => {
          console.log("プロフィール更新成功");
          setName("");
          closeModal();
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (avatarImage) {
      db.collection("users").doc().update({
        avatar: avatarUrl,
      });

      information
        .updateProfile({
          // 画像変更
          photoURL: avatarUrl,
        })
        .then(() => {
          console.log("プロフィール更新成功");
          closeModal();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    //"https://firebasestorage.googleapis.com/v0/b/ring-6c2f7.appspot.com/o/avatar%2Fanimal_chara_bad4_neko.png?alt=media&token=783201be-929d-44f4-8841-78d2d4d40733",

    if (birth) {
      db.collection("users").doc().update({
        birth,
      });
    }
  };

  // パスワードリセット
  const onPasswordClick = (value) => {
    if (!value) {
      alert("パスワード変更の方 : メールアドレスが入力されていません");
    }
    const auth = firebase.auth();
    const emailAddress = value;

    auth
      .sendPasswordResetEmail(emailAddress)
      .then(() => {
        console.log("パスワードリセット");
        closePasswordModal();
        setReset("");
      })
      .catch((err) => console.log(err));
    closePasswordModal();
  };

  // アドレス変更
  const ChangeAddress = (email, password) => {
    const information = firebase.auth().currentUser;

    if (!email) {
      alert("メールアドレスを入力してください");
    } else if (!password) {
      alert("パスワードを入力してください");
      console.log(password, "pass");
    } else {
      const credential = firebase
        .auth()
        // 既存のユーザーをログインさせる
        .signInWithEmailAndPassword(email, password);

      information
        .updateEmail(email)
        .then(() => {
          console.log("アドレス変更完了");
          setEmail("");
          setPassword("");
          closeModal();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // 画像アップロード
  const prevAvatar = () => {
    if (avatarImage === "") {
      alert("ファイルを選択されていません");
      return;
    }
    setUpload(true);
    // アバターアップロード
    const uploadTask = storage
      .ref(`/icons/${avatarImage.name}`)
      .put(avatarImage);
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
  };

  // エラーハンドリング
  const error = (err) => console.log(err);

  // useEffect?
  const complete = () => {
    // 完了後の処理
    // 画像表示のため、アップロードした画像のURLを取得
    storage
      .ref("icons")
      .child(avatarImage.name)
      .getDownloadURL()
      .then((fireBaseUrl) => {
        setAvatarUrl(fireBaseUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal open={modal} onClose={closeModal}>
        <Modal.Header>プロフィール</Modal.Header>
        <Modal.Content style={{ width: "100%" }}>
          <Grid.Column container>
            <Grid.Row>
              {upload ? (
                <Image
                  src={avatarUrl}
                  height={120}
                  width={120}
                  size="small"
                  circular
                  style={{ margin: "0 auto" }}
                />
              ) : (
                <Image
                  src={user ? user.photoURL : null}
                  height={120}
                  width={120}
                  size="small"
                  circular
                  style={{ margin: "0 auto" }}
                />
              )}
              <Button color="green" onClick={prevAvatar} inverted>
                <Icon name="checkmark" />
                　アバタープレビュー
              </Button>
            </Grid.Row>
          </Grid.Column>
          <Form>
            <Form.Field>
              <label>アバターの変更</label>
              <Input type="file" onChange={handlePreview} />
            </Form.Field>
            <Form.Field>
              <label>名前の変更</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder={user ? user.displayName : ""}
              />
            </Form.Field>
            <Form.Field>
              <label>誕生日の設定</label>
              <Input
                type="date"
                placeholder="生年月日"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={openPasswordModal} inverted>
            <Icon name="checkmark" />
            　パスワード変更
          </Button>
          <Button color="red" inverted onClick={closeModal}>
            <Icon name="remove" />
            　キャンセル
          </Button>
          <Button
            color="green"
            onClick={() => {
              onBtnClick(name, email, password, birth);
            }}
            inverted
          >
            <Icon name="checkmark" />
            　保存
          </Button>
        </Modal.Actions>
      </Modal>

      <Modal open={passwordModal} onClose={closePasswordModal}>
        <Modal.Header style={{ width: "100%", display: "flex" }}>
          <span>メールアドレスorパスワード再設定</span>
          <Button
            onClick={closePasswordModal}
            style={{ justifyContent: "spaceBetween" }}
          >
            キャンセル
          </Button>
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>メールアドレスの変更</label>
              <Input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="mail"
                placeholder={user ? user.email : ""}
              />
            </Form.Field>
            <Form.Field>
              <label>
                ※メールアドレスを変更する場合はパスワードを入力してください
              </label>
              <Input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
              />
            </Form.Field>
            <Button
              onClick={() => {
                ChangeAddress(email, password);
              }}
            >
              送信
            </Button>
          </Form>
        </Modal.Content>
        <Modal.Content>
          <Form
            onSubmit={() => {
              onPasswordClick(reset);
            }}
          >
            <Form.Field>
              <label>パスワード変更の方はアドレスを入力してください</label>
              <Input
                type="email"
                value={reset}
                onChange={(e) => {
                  setReset(e.target.value);
                }}
              />
            </Form.Field>
            <Button
              onClick={() => {
                onPasswordClick(reset);
              }}
            >
              送信
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default ProfileModal;
