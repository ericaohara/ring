import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthService";
import firebase from "../config/firebase";
import { Button, Modal, Icon, Form, Input } from "semantic-ui-react";

const MemberPlusModal = ({ modal, closeModal, groupId }) => {
  const { user, groups } = useContext(AuthContext);
  const [addUserId, setAddUserId] = useState("");
  const [idOpen, setIdOpen] = useState(false);

  const groupName = () => {
    if (groups) {
      const groupDetail = groups.find((group) => group.id === groupId);
      return groupDetail.groupName;
    }
  };

  const groupIdGet = () => {
    if (groups) {
      const groupDetail = groups.find((group) => group.id === groupId);
      return groupDetail.id;
    }
  };

  const memberPlus = (id) => {
    firebase
      .firestore()
      .collection("groups")
      .doc(groupIdGet())
      .update({
        // 配列にメンバーを追加
        users: firebase.firestore.FieldValue.arrayUnion(id),
      });
    setAddUserId("");
    closeModal();
  };

  return (
    <>
      <Modal size="small" open={modal} onClose={closeModal}>
        <Modal.Header>メンバーを追加</Modal.Header>
        <Modal.Content>
          <div>追加したいメンバーのIDを入力して下さい</div>
          <div>選択グループ</div>
          <Icon name="angle right" />
          {groupName()}
          <Form>
            <Input
              type="text"
              value={addUserId}
              onChange={(e) => {
                setAddUserId(e.target.value);
              }}
            />
            <Button
              onClick={() => {
                memberPlus(addUserId);
              }}
            >
              追加
            </Button>
          </Form>
          <Form>
            <Button
              basic
              onClick={() => {
                setIdOpen(!idOpen);
              }}
            >
              ユーザーID表示
            </Button>
            {idOpen && <span>{user.uid}</span>}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" onClick={closeModal}>
            <Icon name="remove" />
            　キャンセル
          </Button>
          <Button basic color="green">
            <Icon name="checkmark" />
            　保存
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default MemberPlusModal;
