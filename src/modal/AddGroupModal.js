import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthService";

import { Button, Modal, Icon, Form } from "semantic-ui-react";

const AddGroupModal = ({
  modal,
  closeModal,
  groupName,
  setGroupName,
  onFormSubmit,
}) => {
  const user = useContext(AuthContext);

  return (
    <>
      <Modal size="small" open={modal} onClose={closeModal}>
        <Modal.Header>グループ新規作成</Modal.Header>
        <Modal.Content>
          <Form onSubmit={onFormSubmit}>
            <Form.Field>
              <label>グループ名</label>
              <input
                onChange={(e) => {
                  setGroupName(e.target.value);
                }}
                value={groupName}
                placeholder="グループ名"
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={onFormSubmit} inverted>
            <Icon name="checkmark" />
            　追加
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
