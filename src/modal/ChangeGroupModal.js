import React, { useState, useContext, useEffect } from "react";
import firebase from "../config/firebase";
import { AuthContext } from "../AuthService";
import GroupConfigModal from "./GroupConfigModal.js";
import { Redirect } from "react-router-dom";

import {
  Button,
  Modal,
  Icon,
  Grid,
  Form,
  Input,
  TransitionGroup,
} from "semantic-ui-react";

const ChangeGroupModal = ({ modal, closeModal }) => {
  const { groups, users, user } = useContext(AuthContext);

  const [groupName, setGroupName] = useState("");
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

  // const addId =()=>{
  //   const groupDateIds = users.find((user)=>{user.id === user.uid})
  //   const groupGetId = groupDateIds.map((groupDateId) => {
  //     return groupDateId.
  //   });
  // }

  // const addId = () => {
  //   if (!users) {
  //     return;
  //   }
  //   return users.map((user) => user.id);
  // };

  /**user.uidを取得する為の関数 */
  const getId = () => {
    if (!user) {
      return;
    }
    return user.uid;
  };

  /**firebaseへグループの追加*/
  const addGroup = () => {
    db.collection("users")
      .doc(user.uid)
      .collection("groups")
      .doc()
      .set({
        groupName: groupName,
        groupId: groupName,
        // createdUserId: getId(),
      })
      .then(() => {
        console.log("グループ追加成功！");
        console.log(groups);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(groups);

  const add = () => {
    if (!groups) {
      return;
    }
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
          {group.groupName}
        </Button>
      );
    });

    // 配列の中の配列から値を取り出すパターン１
    // const dbUser = users.find((_user) => _user.id === user.uid);
    // return dbUser.groups.map((group) => {
    //   return (
    //     <Button
    //       id={group.id}
    //       onClick={changeGroup}
    //       type="button"
    //       basic
    //       color="blue"
    //       active={group.id === activeGroup}
    //     >
    //       {group.groupName}
    //     </Button>
    //   );
    // });

    // 配列の中の配列から値を取り出すパターン２
    // let groupButtons;
    // users.forEach((dbUser) => {
    //   if (dbUser.id === user.uid) {
    //     groupButtons = dbUser.groups.map((group) => {
    //       return (
    //         <Button
    //           id={group.id}
    //           onClick={changeGroup}
    //           type="button"
    //           basic
    //           color="blue"
    //           active={group.id === activeGroup}
    //         >
    //           {group.groupName}
    //         </Button>
    //       );
    //     });
    //   }
    // });
    // return groupButtons;
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
              {users ? add() : ""}
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
        // addGroup={addGroup}
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
