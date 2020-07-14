import React, { useContext } from "react";
import { AuthContext } from "../AuthService";

import { Button, Modal, Icon, Grid } from "semantic-ui-react";

const ChangeGroupModal = ({ modal, closeModal }) => {
  const user = useContext(AuthContext);

  return (
    <>
      <Modal open={modal} onClose={closeModal}>
        <Modal.Header>グループ設定</Modal.Header>
        <Modal.Content>
          <Grid columns={1}>
            <Grid.Row>
              <Button fluid basic>
                グループA
              </Button>
            </Grid.Row>
            <Button fluid basic>
              グループB
            </Button>
            <Grid.Row>
              <Button fluid basic>
                グループC
              </Button>
            </Grid.Row>
            <Grid.Row>
              <Button fluid basic>
                グループを作成
              </Button>
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" inverted onClick={closeModal}>
            <Icon name="remove" />
            　キャンセル
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default ChangeGroupModal;
