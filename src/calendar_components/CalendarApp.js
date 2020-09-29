import React, { useState } from "react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button, Modal, Icon, Form } from "semantic-ui-react";

export const CalendarApp = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div className="Sample">
      <div className="Sample__container">
        <main className="Sample__container__content">
          <Calendar onChange={onChange} value={value} />
        </main>
        <Modal size="small">
          <Modal.Header>予定管理</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>予定</label>
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Icon name="checkmark" />
            　追加
            <Button color="red" inverted>
              <Icon name="remove" />
              　キャンセル
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    </div>
  );
};
