import React, { useState } from "react";
import moment from "moment";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { SingleDatePicker } from "react-dates";

const CalendarApp = () => {
  // momentは今日の日付
  const [date, setDate] = useState(moment());
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <SingleDatePicker
        date={date}
        // 選択された日付範囲が変更されるときに呼び出される
        onDateChange={(date) => setDate(date)}
        focused={focused}
        onFocusChange={(focused) => setFocused(focused)}
        id="date"
        displayFormat="YYYY-MM-DD"
        onClose={(focused) => setFocused(false)}
      />
    </div>
  );
};

export default CalendarApp;
