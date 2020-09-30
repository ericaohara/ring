import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthService";
import firebase from "firebase";
import MemberPlusModal from "./MemberPlusModal";

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
  const { groups } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [updateGroupId, setUpdateGroupId] = useState(null);
  const [modalMemberPlus, setModalMemberPlus] = useState(false);

  const db = firebase.firestore();

  const openMemberPlusModal = () => setModalMemberPlus(true);
  const closeMemberPlusModal = () => setModalMemberPlus(false);

  /** input入力したらグループ名が変わるようにしたい */
  const onBtnClick = () => {
    if (!name) {
      alert("グループ名を入力して下さい！");
      return;
    }
    db.collection("groups")
      .doc(updateGroupId)
      .get()
      .then((details) => {
        // ref = DocumentReference
        details.ref.update({
          groupName: name,
        });
      });
    setName("");
    closeModal();
  };

  /** グループ削除 */
  const removeGroup = (id) => {
    db.collection("groups")
      .where("id", "==", id)
      .get()
      .then((res) => {
        res.docs.map((doc) => {
          doc.ref.delete();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!groups) {
      return;
    }
    setUpdateGroupId(groups[0].id);
  }, [groups]);

  /** チェックボックス付きのグループ名表示 */
  const chooseGroup = () => {
    if (!groups) {
      return;
    }
    return groups.map((group) => {
      const checkId = group.id === updateGroupId;
      return (
        <Form.Field>
          <Checkbox
            radio
            checked={checkId}
            id={group.id}
            onClick={(e) => {
              setUpdateGroupId(e.target.id);
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
              <Input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" onClick={closeModal}>
            <Icon name="remove" />
            {Responsive.onlyMobile.minWidth ? "" : "キャンセル"}
          </Button>
          <Button onClick={openMemberPlusModal} basic color="orange">
            <Icon name="users" />
            {Responsive.onlyMobile.minWidth ? "" : "メンバーを招待"}
          </Button>
          <Button
            basic
            color="grey"
            id={updateGroupId}
            onClick={(e) => {
              removeGroup(e.target.id);
            }}
          >
            <Icon name="trash alternate outline" />
            {Responsive.onlyMobile.minWidth ? "" : "削除"}
          </Button>
          <Button basic color="green" onClick={onBtnClick}>
            <Icon name="sync alternate" />
            {Responsive.onlyMobile.minWidth ? "" : "変更"}
          </Button>
          <MemberPlusModal
            modal={modalMemberPlus}
            closeModal={closeMemberPlusModal}
            groupId={updateGroupId}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default GroupConfigModal;
