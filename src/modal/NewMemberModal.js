import React from "react";
import { Button, Modal } from "semantic-ui-react";

export const NewMemberModal = ({ close }) => {
  return (
    <div>
      <Modal onClose={close}>
        <Modal.Header>新規登録ありがとうございます！</Modal.Header>
        <Modal.Content>
          アプリをご利用頂きありがとうございます。
          まずはグループの追加をしてご利用を開始して下さい。
        </Modal.Content>
        <Modal.Actions>
          <Button positive onClick={close}>
            Agree
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};
