import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthService";
import firebase from "firebase";
import MemberPlusModal from "./MemberPlusModal";

import { Button, Modal, Icon, Form, Input, Checkbox } from "semantic-ui-react";

const GroupConfigModal = ({ modal, closeModal }) => {
  const { groups, setGroups, user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [updateGroupId, setUpdateGroupId] = useState(null);
  const [modalMemberPlus, setModalMemberPlus] = useState(false);

  const db = firebase.firestore();

  const openMemberPlusModal = () => setModalMemberPlus(true);
  const closeMemberPlusModal = () => setModalMemberPlus(false);

  /** input入力したらグループ名が変わるようにしたい */
  const onBtnClick = () => {
    if (!name) {
      alert("グループ名を入力して下さい！");
      return;
    }
    db.collection("groups")
      .doc(updateGroupId)
      .get()
      .then((details) => {
        // ref = DocumentReference
        details.ref.update({
          groupName: name,
        });
      });
    setName("");
    closeModal();
  };

  /** グループ削除 */
  const removeGroup = (id) => {
    db.collection("groups")
      .where("id", "==", id)
      .get()
      .then((res) => {
        console.log(res);
        res.docs.map((doc) => {
          doc.ref.delete();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const checkBox = async (id) => {
  //   // updateは非同期
  //   await db
  //     .collection("users")
  //     .doc(user.uid)
  //     .collection("groups")
  //     .doc()
  //     .update({
  //       checked: false,
  //     });
  //   await db
  //     .collection("users")
  //     .doc(user.uid)
  //     .collection("groups")
  //     .where("groupId", "==", id)
  //     .update({
  //       checked: true,
  //     });
  //   const groupsUpdate = await db
  //     .collection("users")
  //     .doc(user.uid)
  //     .collection("groups")
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         doc.data();
  //       });
  //     });

  //   return setGroups(groupsUpdate);
  // };

  useEffect(() => {
    if (!groups) {
      return;
    }
    setUpdateGroupId(groups[0].id);
  }, [groups]);

  /** チェックボックス付きのグループ名表示 */
  const chooseGroup = () => {
    if (!groups) {
      return;
    }
    return groups.map((group) => {
      const checkId = group.id === updateGroupId;
      return (
        <Form.Field>
          <Checkbox
            radio
            checked={checkId}
            id={group.id}
            onClick={(e) => {
              setUpdateGroupId(e.target.id);
            }}
            style={{ marginRight: "10px" }}
          />
          {group.groupName}
        </Form.Field>
      );
    });
  };

  return (
    <>
      <Modal size="small" open={modal} onClose={closeModal}>
        <Modal.Header>グループ設定</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>グループ選択</label>
              {chooseGroup()}
            </Form.Field>
            <Form.Field>
              <label>グループ名変更</label>
              <Input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" onClick={closeModal}>
            <Icon name="remove" />
            キャンセル
          </Button>
          <Button onClick={openMemberPlusModal} basic color="orange">
            <Icon name="users" />
            メンバーを招待
          </Button>
          <Button
            basic
            color="grey"
            id={updateGroupId}
            onClick={(e) => {
              removeGroup(e.target.id);
            }}
          >
            <Icon name="trash alternate outline" />
            削除
          </Button>
          <Button basic color="green" onClick={onBtnClick}>
            <Icon name="sync alternate" />
            変更
          </Button>
          <MemberPlusModal
            modal={modalMemberPlus}
            closeModal={closeMemberPlusModal}
            groupId={updateGroupId}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default GroupConfigModal;

// 追加処理

// const [columns, setColumns] = useState([]);

//   const addColumn = () => {
//     setColumns([...columns, { id: `id${columns.length + 1}`, value: "" }]);
//     console.log(email);
//   };

//   const columnPlus = columns.map((input) => {
//     const handleChange = (e) => {
//       const plus = columns.map((column) => {
//         if (column.id === e.target.id) {
//           return { ...column, value: e.target.value };
//         } else {
//           return column;
//         }
//       });
//       setColumns(plus);
//     };

//     return (
//       <Input
//         type="email"
//         id={input.id}
//         value={input.value}
//         onChange={handleChange}
//         placeholder="アドレスを入力"
//         icon={<Icon name="minus circle" inverted color="red" link />}
//         // action={{ icon: "minus circle", color: "red" }}
//         style={{ marginTop: "10px" }}
//         // onClick={columnDelete}
//       />
//     );
//   });
