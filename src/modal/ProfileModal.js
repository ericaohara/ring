import React, { useContext } from "react";
import { AuthContext } from "../AuthService";

import { Button, Modal, Icon, Image } from "semantic-ui-react";

const ProfileModal = ({ modal, closeModal }) => {
  const user = useContext(AuthContext);

  return (
    <>
      <Modal open={modal} onClose={closeModal}>
        <Modal.Header>プロフィール</Modal.Header>
        <Modal.Content>
          <Image src="/" size="medium" circular />
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
