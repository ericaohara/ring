import axios from "axios";

export default axios.create({
  baseURL: "https://www.googleapis.com/calendar/v3",
  headers: {
    Authorization: "Bearer AIzaSyAacRiYocTkcL7u4G--PVdMRrRGj1Gw4KQ",
  },
});
// https://www.googleapis.com/calendar/v3/ja.japanese#holiday@group.v.calendar.google.comevents?singleEvents=true&orderBy=startTime&timeMin=2015-07-14T00%3A00%3A00.000Z&timeMax=2015-07-15T00%3A00%3A00.000Z&key=AIzaSyAacRiYocTkcL7u4G--PVdMRrRGj1Gw4KQ

// params: {
//   calendarId: "ja.japanese#holiday@group.v.calendar.google.com",
//     key: KEY,
//     },

// export default CalendarApp;
