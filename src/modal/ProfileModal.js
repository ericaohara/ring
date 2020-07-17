import React, { useState, useContext, useReducer } from "react";
import { AuthContext } from "../AuthService";
import firebase, { storage } from "firebase";

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
  const [previewImage, setPreviewImage] = useState("");
  const [avatarImage, setAvatarImage] = useState("");

  const user = useContext(AuthContext);

  const handlePreview = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        setPreviewImage(reader.result);
      });
    }
  };

  // const next = (snapshot) => {
  //   // 進行中のsnapshotを得る
  //   // アップロードの進行度を表示
  //   const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //   console.log(percent + "% done");
  //   console.log(snapshot);
  // };

  // // エラーハンドリング
  // const error = (err) => console.log(err);

  // const complete = () => {
  //   // 完了後の処理
  //   // 画像表示のため、アップロードした画像のURLを取得
  //   storage
  //     .ref("images")
  //     .child(image.name)
  //     .getDownloadURL()
  //     .then((fireBaseUrl) => {
  //       setImageUrl(fireBaseUrl);
  //     });
  // };

  const onBtnClick = () => {
    const metadata = {
      contentType: "image/jpeg",
    };
    const uploadTask = storage.ref(`/avatars/${user.uid}`).put(avatarImage);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, {
      next: function (snapshot) {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(percent);
      },
      error: function (err) {
        console.log(err);
      },
      complete: function () {
        storage
          .ref("avatars")
          .child(user.uid)
          .getDownloadUrl()
          .then((firebaseUrl) => {
            setAvatarImage(firebaseUrl);
            changeAvatar();
          });
      },
    });
  };

  const changeAvatar = () => {
    user
      .updateProfile({
        photoURL: avatarImage,
        // closeModal()
      })
      .then(() => {
        console.log("PhotoURL");
      })
      .catch((err) => {
        console.log(err);
      });

    storage
      .ref(user)
      .child(user.uid)
      .update(setAvatarImage())
      .then(() => {
        console.log("アバターアップデート");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal open={modal} onClose={closeModal}>
        <Modal.Header>プロフィール</Modal.Header>
        <Modal.Content>
          <Grid.Column>
            {previewImage && (
              <Image
                src={previewImage}
                height={120}
                width={120}
                size="small"
                circular
              />
            )}
          </Grid.Column>
          <Form>
            <Form.Field>
              <Input
                onChange={handlePreview}
                type="file"
                placeholder="アバターの変更"
              />
            </Form.Field>
            <Form.Field>
              <Input type="text" placeholder={user.displayName} />
            </Form.Field>
            <Form.Field>
              <Input type="date" placeholder="生年月日" />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={onBtnClick} inverted>
            <Icon name="checkmark" />
            　保存
          </Button>
          <Button color="red" inverted onClick={closeModal}>
            <Icon name="remove" />
            　キャンセル
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default ProfileModal;
