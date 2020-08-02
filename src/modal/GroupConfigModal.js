import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthService";
import firebase from "firebase";

import { Button, Modal, Icon, Form, Input, Checkbox } from "semantic-ui-react";

const GroupConfigModal = ({ modal, closeModal, addGroup }) => {
  const { groups, setGroups, user } = useContext(AuthContext);
  const [name, setName] = useState("");

  const db = firebase.firestore();

  const onBtnClick = () => {
    setName("");
    closeModal();
  };

  const isChecked = (e) => {
    groups.map((group) => {
      if (e.target.id === group.id) {
        return db
          .collection("users")
          .doc(user.uid)
          .collection("groups")
          .doc()
          .update({
            checked: !false,
          });
      } else {
        return group;
      }
    });
    // setGroups(checkedGroup);
  };

  const checkBox = () => {
    return groups.map((group) => {
      return <>{group.checked}</>;
    });
  };

  // チェックボックスを1つクリックしたら他のボックスをdisabled
  // チェックしたグループ名の内容を変更(名前の変更とメール)できるようにリンクしたい
  const chooseGroup = () => {
    if (!groups) {
      return;
    }
    return groups.map((group) => {
      return (
        <div>
          <Checkbox
            onClick={isChecked}
            checked={checkBox}
            id={groups.id}
            // disabled
          />
          {group.groupName}
        </div>
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
                placeholder={groups.name}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
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
