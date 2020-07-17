import React, { useState, useContext } from "react";
import firebase from "../config/firebase";
import { AuthContext } from "../AuthService";
import AddGroupModal from "./AddGroupModal";

import { Button, Modal, Icon, Grid } from "semantic-ui-react";

const ChangeGroupModal = ({ modal, closeModal }) => {
  const user = useContext(AuthContext);
  const [modalAddGroup, setModalAddGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState([]);

  const openAddGroupModal = () => setModalAddGroup(true);
  const closeAddGroupModal = () => setModalAddGroup(false);

  const db = firebase.firestore();

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (groupName === "") {
      alert("グループ名を入力して下さい！");
    }
    setGroupName("");
    closeAddGroupModal();
    // setGroups(...groupName);
    // addGroup();
  };

  // firebaseへグループの追加
  const addGroup = () => {
    db.collection("groups")
      .doc()
      .set({ group: groupName, id: groupName })
      .then(() => {
        console.log("グループ追加成功！");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeGroup = () => {
    // クリックしたら現在のチャンネルを更新する（切替)
  };

  // 追加されたらグループ名のボタンを増やしたい
  // このボタンを押したらグループが切り替わるようにしたい
  const addGroupBtn = () => {
    groups.length > 0 &&
      groups.map((group) => {
        return (
          <Grid.Row>
            <Button fluid basic onClick={changeGroup}>
              {/* グループ名 */}
              {group}
            </Button>
          </Grid.Row>
        );
      });
  };

  return (
    <>
      <Modal open={modal} onClose={closeModal}>
        <Modal.Header>グループ設定</Modal.Header>
        <Modal.Content>
          <Grid columns={1}>
            <Grid.Row>
              <Button fluid basic onClick={openAddGroupModal}>
                グループを作成
              </Button>
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" inverted onClick={closeModal}>
            <Icon name="remove" />
            　キャンセル
          </Button>
        </Modal.Actions>
      </Modal>
      <AddGroupModal
        modal={modalAddGroup}
        closeModal={closeAddGroupModal}
        groupName={groupName}
        setGroupName={setGroupName}
        onFormSubmit={onFormSubmit}
      />
    </>
  );
};

export default ChangeGroupModal;
