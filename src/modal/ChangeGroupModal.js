import React, { useState, useContext, useEffect } from "react";
import firebase from "../config/firebase";
import { AuthContext } from "../AuthService";
import GroupConfigModal from "./GroupConfigModal.js";

import { Button, Modal, Icon, Form, Input } from "semantic-ui-react";

const ChangeGroupModal = ({ modal, closeModal }) => {
  const { groups, users, user, currentGroup, setCurrentGroup } = useContext(
    AuthContext
  );

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
        owner: db.doc(`/users/${user.uid}`),
        users: [db.doc(`/users/${user.uid}`)],
        createdAt: new Date(),
      })
      .then(() => {
        console.log("グループ追加成功！");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const testGr = () => {
  //   if (groups) {
  //     return groups.map((g) => {
  //       return g.users.map((user) => {
  //         user.get().then((res) => {
  //           return res.data().id === user.uid;
  //         });
  //       });
  //     });
  //   }
  // };

  // console.log(testGr()); undefined

  // 自分がもってるグループだけ表示させたい
  // 現状全部のグループが出力されている
  /** グループ毎にボタンを増やす関数*/
  const addBtn = () => {
    if (groups) {
      const checkId = groups.find((group) => group.id === currentGroup);

      if (checkId) {
        return groups.map((group) => {
          return (
            <Button
              id={group.id}
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
        });
      }
    }
  };

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

  // const handleFirstGroup = () => {
  //   const firstGroup = groups[0];
  //   if (firstLoad && groups.length > 0) {
  //     setCurrentGroup(firstGroup);
  //     setActiveGroup(firstGroup);
  //   }
  //   setFirstLoad(false);
  // };

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
              {users ? addBtn() : ""}
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" onClick={closeModal}>
            <Icon name="remove" />
            キャンセル
          </Button>
          <Button basic color="black" onClick={openGroupConfigModal}>
            <Icon name="whmcs" onClick={openGroupConfigModal} />
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
