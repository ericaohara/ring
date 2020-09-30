import React from "react";
import { Button, Modal, Icon } from "semantic-ui-react";
import TodoApp from "../todo_components/TodoApp";

const TodoModal = ({ modal, closeModal }) => {
  return (
    <>
      <Modal size="small" open={modal} onClose={closeModal}>
        <Modal.Header>TODO</Modal.Header>
        <Modal.Content style={{ height: 500, overflowY: "scroll" }}>
          <TodoApp />
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" onClick={closeModal}>
            戻る
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default TodoModal;
