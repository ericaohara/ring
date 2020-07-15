import React, { useContext } from "react";
import { AuthContext } from "../AuthService";

import { Button, Modal, Icon, Card, Image } from "semantic-ui-react";

const ConfigModal = ({ modal, closeModal }) => {
  const user = useContext(AuthContext);

  return (
    <>
      <Modal size="small" open={modal} onClose={closeModal}>
        <Modal.Header>設定</Modal.Header>
        <Modal.Content>
          <Card>
            <Image src="/" wrapped ui={false} />
            <Card.Content>
              <Card.Header>制作者へメッセージを送信</Card.Header>
              <Card.Meta>
                <span className="date">Joined in 2015</span>
              </Card.Meta>
              <Card.Description>
                Matthew is a musician living in Nashville.
              </Card.Description>
            </Card.Content>
            <Card.Content extra></Card.Content>
          </Card>
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

export default ConfigModal;
