import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthService";
import { firestore } from "../config/firebase";
import { Button, Modal, Icon, Form, Input } from "semantic-ui-react";

const MemberPlusModal = ({ modal, closeModal, groupId }) => {
  const { user, groups } = useContext(AuthContext);
  const [addUserId, setAddUserId] = useState("");

  const groupName = () => {
    if (groups) {
      const groupDetail = groups.find((group) => group.groupId === groupId);
      return groupDetail.groupName;
    }
  };

  const memberPlus = (id) => {
    // firebase.firestore().collection('groups')
    // .doc(id).update({
    //   users:firebase.firestore.FieldValue.arrayUnion('users'/user.uid)
    // })
  };

  return (
    <>
      <Modal size="small" open={modal} onClose={closeModal}>
        <Modal.Header>設定</Modal.Header>
        <Modal.Content>
          <div>選択グループ</div>
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
            <Button>ユーザーID表示</Button>
            <span>{user.uid}</span>
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
