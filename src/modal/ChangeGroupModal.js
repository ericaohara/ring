import React, { useState, useContext, useEffect } from "react";
import firebase from "../config/firebase";
import { AuthContext } from "../AuthService";
import GroupConfigModal from "./GroupConfigModal.js";

import { Button, Modal, Icon, Form, Input } from "semantic-ui-react";

const ChangeGroupModal = ({ modal, closeModal }) => {
  const { groups, users, user, setCurrentGroup } = useContext(AuthContext);

  const [groupName, setGroupName] = useState("");
  const [configModal, setConfigModal] = useState(false);

  const openGroupConfigModal = () => setConfigModal(true);
  const closeGroupConfigModal = () => setConfigModal(false);

  const db = firebase.firestore();

  /** グループ追加 */
  const onFormSubmit = (groupName) => {
    if (groupName === "") {
      alert("グループ名を入力して下さい！");
    } else if (
      groups.filter((group) => group.groupName === groupName).length > 1
    ) {
      alert("既に同じ名前のグループが存在します");
      return;
    } else {
      setGroupName("");
      addGroup();
    }
  };

  /** グループ切り替える */
  const changeGroup = (groupId) => {
    setCurrentGroup(groupId);
    closeModal();
  };

  /**firebaseへグループの追加*/
  const addGroup = () => {
    db.collection("groups")
      .doc()
      .set({
        groupName,
        owner: user.uid,
        users: firebase.firestore.FieldValue.arrayUnion(user.uid),
        createdAt: new Date(),
      });
  };

  /** グループ毎にボタンを増やす関数*/
  const addBtn = () => {
    if (groups && user && users) {
      return groups.map((group) => {
        const checkId = group.users.filter((u) => u === user.uid);
        if (checkId.length > 0) {
          return (
            <Button
              onClick={() => {
                changeGroup(group.id);
              }}
              type="button"
              basic
              color="blue"
            >
              {group.groupName}
            </Button>
          );
        }
      });
    }
  };

  return (
    <>
      <Modal open={modal} onClose={closeModal}>
        <Modal.Header>グループ設定</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>グループ追加</label>
              <Input
                value={groupName}
                onChange={(e) => {
                  setGroupName(e.target.value);
                }}
                placeholder="グループ名"
              />
            </Form.Field>
            <Form.Field>
              <label>グループ切替</label>
              {addBtn()}
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" onClick={closeModal}>
            <Icon name="remove" />
            キャンセル
          </Button>
          <Button basic color="black" onClick={openGroupConfigModal}>
            <Icon name="setting" onClick={openGroupConfigModal} />
            設定
          </Button>
          <Button
            basic
            color="green"
            onClick={() => {
              onFormSubmit(groupName);
            }}
          >
            <Icon name="plus" />
            追加
          </Button>
        </Modal.Actions>
      </Modal>
      <GroupConfigModal
        modal={configModal}
        closeModal={closeGroupConfigModal}
      />
    </>
  );
};

export default ChangeGroupModal;
