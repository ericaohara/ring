import axios from "axios";

const KEY = "AIzaSyAacRiYocTkcL7u4G--PVdMRrRGj1Gw4KQ";

export default axios
  .create({
    baseURL: "https://www.googleapis.com/calendar/v3",
    params: {
      calendarId: "ja.japanese#holiday@group.v.calendar.google.com",
      key: KEY,
    },
  })
  .get("/calendars");
// https://www.googleapis.com/calendar/v3/ja.japanese#holiday@group.v.calendar.google.comevents?singleEvents=true&orderBy=startTime&timeMin=2015-07-14T00%3A00%3A00.000Z&timeMax=2015-07-15T00%3A00%3A00.000Z&key=AIzaSyAacRiYocTkcL7u4G--PVdMRrRGj1Gw4KQ

// export default CalendarApp;
