import React from "react";
import TodoApp from "./todo_components/TodoApp";
import CalendarApp from "./calendar_components/CalendarApp";
import ChatApp from "./chat_components/ChatApp";
import SideBar from "./SideBar";

import { Grid } from "semantic-ui-react";

const TopPage = () => {
  return (
    <Grid columns="equal">
      <SideBar />
      <Grid.Column style={{ marginLeft: 150 }}>
        <ChatApp />
      </Grid.Column>
      <Grid.Column width={4}>
        <TodoApp />
      </Grid.Column>
    </Grid>
  );
};

export default TopPage;

// style={{ position: "fixed", right: 0, top: 0 }}
