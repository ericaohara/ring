import React, { useState, useContext, useEffect } from "react";
import firebase from "../config/firebase";
import { AuthContext } from "../AuthService";
import GroupConfigModal from "./GroupConfigModal.js";
import { Redirect } from "react-router-dom";

import { Button, Modal, Icon, Grid, Form, Input } from "semantic-ui-react";

const ChangeGroupModal = ({ modal, closeModal }) => {
  const { groups, users, user } = useContext(AuthContext);

  const [groupName, setGroupName] = useState("");
  const [button, setButton] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);
  const [configModal, setConfigModal] = useState(false);
  // 今どのグループか分かるように設定
  // グループ名つけるから多分いらない
  const [activeGroup, setActiveGroup] = useState("");

  const openGroupConfigModal = () => setConfigModal(true);
  const closeGroupConfigModal = () => setConfigModal(false);

  useEffect(() => {
    allGroup();
  }, []);

  const db = firebase.firestore();

  const onFormSubmit = (groupName) => {
    if (groupName === "") {
      alert("グループ名を入力して下さい！");
    } else {
      setGroupName("");
      addGroup();
    }
  };

  // firebaseへグループの追加
  const addGroup = () => {
    db.collection("groups")
      .doc()
      .set({
        name: groupName,
        id: groupName,
        // users: users,
        // self: user,
      })
      .then(() => {
        console.log("グループ追加成功！");
        console.log(groups);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const add = () => {
    if (groups === "") {
      return;
    } else {
      return groups.map((group) => {
        return (
          <Button
            id={group.id}
            onClick={changeGroup}
            type="button"
            basic
            color="blue"
            active={group.id === activeGroup}
          >
            {group.name}
          </Button>
        );
      });
    }
  };

  const changeGroup = (e) => {
    // クリックしたら現在のチャンネルを更新する（切替)
    // groups.id === e.target.id;
    console.log(groups);
    closeModal();
  };

  const allGroup = () => {
    handleFirstGroup();
  };

  const handleFirstGroup = () => {
    const firstGroup = groups[0];
    if (firstLoad && groups.length > 0) {
      // setCurrentChannel(firstGroup)
      setActiveGroup(firstGroup);
    }
    setFirstLoad(false);
  };

  const handleActiveGroup = () => {
    setActiveGroup(groups.id);
  };

  const home = () => {
    // if (user) {
    //   <Redirect to="/" />;
    // }
    // closeModal();
  };

  return (
    <>
      <Modal open={modal} onClose={closeModal}>
        <Modal.Header>グループ設定</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>グループ名</label>
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
              <Button type="button" basic color="blue" onClick={home}>
                デフォ
              </Button>
              {button ? add() : ""}
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={openGroupConfigModal} inverted>
            <Icon name="checkmark" onClick={openGroupConfigModal} />
            　設定
          </Button>
          <Button
            color="green"
            onClick={() => {
              onFormSubmit(groupName);
            }}
            inverted
          >
            <Icon name="checkmark" />
            　追加
          </Button>
          <Button color="red" inverted onClick={closeModal}>
            <Icon name="remove" />
            　キャンセル
          </Button>
        </Modal.Actions>
      </Modal>
      <GroupConfigModal
        modal={configModal}
        closeModal={closeGroupConfigModal}
        addGroup={addGroup}
      />
    </>
  );
};

export default ChangeGroupModal;

// const add = buttons.map((button) => {
//   const addBtn = (e) => {
//     const add = buttons.map((button) => {
//       if (button.name === e.target.name) {
//         return { ...button, name: e.target.name };
//       } else {
//         return button;
//       }
//     });
//     setButtons(add);
//   };
//   return (
//     <Button name={button.name} basic color="blue">
//       {groupName}
//     </Button>
//   );
// });
