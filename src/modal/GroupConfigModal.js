import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthService";
import firebase from "firebase";

import {
  Button,
  Modal,
  Icon,
  Form,
  Input,
  Checkbox,
  Responsive,
} from "semantic-ui-react";

const GroupConfigModal = ({ modal, closeModal }) => {
  const { groups, setGroups, user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [isDone, setIsDone] = useState(false);

  const db = firebase.firestore();

  /** input入力したらグループ名が変わるようにしたい */
  const onBtnClick = () => {
    setName("");
    db.collection("users")
      .doc("user.uid")
      .collection("groups")
      .doc()
      .update({
        groupName: name,
      })
      .then(() => console.log("nameUpdate"))
      .catch((err) => console.log(err));
    closeModal();
  };

  /** チェックボックス管理 */
  const checkBox = (id) => {
    const conf = groups.find((group) => {
      if (group.groupId === id) {
        db.collection("users")
          .doc(user.uid)
          .collection("groups")
          .where("group.groupId", "==", "id")
          .update({
            checked: true,
          });
      } else {
        db.collection("users").doc(user.uid).collection("groups").doc().update({
          checked: false,
        });
      }
    });
    return setGroups(conf);
  };

  // return groups.find((group) => {
  //   if (group.groupId === id) {
  //     db.collection("users")
  //       .doc(user.uid)
  //       .collection("groups")
  //       .where("groupId", "==", "id")
  //       .get()
  //       .then((response) => {
  //         console.log(response);
  //       });
  //   }
  // });

  /** チェックボックス付きのグループ名表示 */
  const chooseGroup = () => {
    if (!groups) {
      return;
    }
    return groups.map((group) => {
      return (
        <Form.Field>
          <Checkbox
            radio
            checked={group.checked}
            id={group.groupId}
            onClick={(e) => {
              checkBox(e.target.id);
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
              {isDone ? (
                <Input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              ) : (
                <Input disabled />
              )}
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted>
            <Icon name="plus" />
            　メンバーを招待
          </Button>
          <Button color="green" onClick={onBtnClick} inverted>
            <Icon name="checkmark" />
            　決定
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
