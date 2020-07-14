import React, { useContext } from "react";
import { AuthContext } from "../AuthService";

import { Button, Modal, Icon, Image, Form } from "semantic-ui-react";

const ProfileModal = ({ modal, closeModal }) => {
  const user = useContext(AuthContext);

  return (
    <>
      <Modal open={modal} onClose={closeModal}>
        <Modal.Header>プロフィール</Modal.Header>
        <Modal.Content>
          <Image src="/" size="medium" circular />
          <Form>
            <Form.Field>
              <input type="text" placeholder="名前" />
            </Form.Field>
            <Form.Field>
              <input type="date" placeholder="生年月日" />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted>
            <Icon name="checkmark" />
            　保存
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

export default ProfileModal;
