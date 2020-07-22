import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthService";

import { Button, Modal, Icon, Form, Input } from "semantic-ui-react";

const AddGroupModal = ({
  modal,
  closeModal,
  groupName,
  setGroupName,
  onFormSubmit,
}) => {
  const user = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [columns, setColumns] = useState([]);

  const addColumn = () => {
    setColumns([...columns, { id: `id${columns.length + 1}`, value: "" }]);
    console.log(email);
  };

  // 要素特定出来なきゃ消せねえ
  const columnDelete = (e) => {
    setColumns(columns.filter((column) => column.id !== e.target.id));
  };

  const columnPlus = columns.map((input) => {
    const handleChange = (e) => {
      const plus = columns.map((column) => {
        if (column.id === e.target.id) {
          return { ...column, value: e.target.value };
        } else {
          return column;
        }
      });
      setColumns(plus);
    };

    return (
      <Input
        type="email"
        id={input.id}
        value={input.value}
        onChange={handleChange}
        placeholder="アドレスを入力"
        action={{ icon: "minus circle", color: "red" }}
        style={{ marginTop: "10px" }}
        // onClick={columnDelete}
      />
    );
  });

  return (
    <>
      <Modal size="small" open={modal} onClose={closeModal}>
        <Modal.Header>グループ新規作成</Modal.Header>
        <Modal.Content>
          <Form onSubmit={onFormSubmit}>
            <Form.Field>
              <label>グループ名</label>
              <Input
                onChange={(e) => {
                  setGroupName(e.target.value);
                }}
                value={groupName}
                placeholder="グループ名"
              />
            </Form.Field>
            <Form.Field>
              <label>メンバーを招待</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="アドレスを入力"
              />
              {columnPlus}
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={addColumn} inverted>
            <Icon name="plus" />
            　アドレス欄を追加
          </Button>
          <Button color="green" onClick={columnDelete} inverted>
            <Icon name="plus" />
            　削除
          </Button>
          <Button color="green" onClick={onFormSubmit} inverted>
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

export default AddGroupModal;
