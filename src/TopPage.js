import React from "react";
import TodoApp from "./todo_components/TodoApp";
import CalendarApp from "./calendar_components/CalendarApp";
import ChatApp from "./chat_components/ChatApp";
import Topbar from "./Topbar";

const TopPage = () => {
  return (
    <>
      <Topbar />
      <ChatApp />
      <TodoApp />
      <CalendarApp />
    </>
  );
};

export default TopPage;
