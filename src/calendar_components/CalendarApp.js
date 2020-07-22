import React, { useState } from "react";

// フルカレンダー
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";

// export const CalendarApp = () => {
//   return <FullCalendar
//   plugins={[dayGridPlugin]}
//   initialView="dayGridMonth"
//   />;
// };

// googleAPI
// import CalendarApi from './CalendarApi'

// export const CalendarApp = ()=>{
//   const [calendar, setCalendar] = useState('')

//   const getCalendar = async ()=>{
//     const response = await CalendarApi.get("/calendars",{
//       params:{
//         "kind": "calendar#calendar",
//         "etag": etag,
//         "id": string,
//         "summary": string,
//         "description": string,
//         "location": string,
//         "timeZone": string,
//         "conferenceProperties": {
//           "allowedConferenceSolutionTypes": [
//             string
//           ]
//         }
//       }
//     })
//     setCalendar(response.data.ja.japanese#holiday@group.v.calendar.google.com)

//   }

//   return <div>{getCalendar}</div>

// }

// reactカレンダー;
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button, Modal, Icon, Form } from "semantic-ui-react";

export const CalendarApp = () => {
  const [value, onChange] = useState(new Date());
  const [dayModal, setDayModal] = useState(false);

  const openModal = () => setDayModal(true);
  const closeModal = () => setDayModal(false);

  return (
    <div className="Sample">
      <div className="Sample__container">
        <main className="Sample__container__content">
          <Calendar onClickDay={openModal} onChange={onChange} value={value} />
        </main>
        <Modal size="small" open={dayModal} onClose={closeModal}>
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
            <Button color="red" inverted onClick={closeModal}>
              <Icon name="remove" />
              　キャンセル
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    </div>
  );
};
