import React from "react";
import TodoApp from "./todo_components/TodoApp";
import { CalendarApp } from "./calendar_components/CalendarApp";
import ChatApp from "./chat_components/ChatApp";
import SideBar from "./SideBar";

import { Grid } from "semantic-ui-react";

const TopPage = () => {
  return (
    <>
      <Grid columns="equal">
        <SideBar />
        <Grid.Column style={{ marginLeft: 350 }}>
          <ChatApp />
        </Grid.Column>
        <div className="vertical">
          <Grid.Column>
            <CalendarApp />
          </Grid.Column>
          <Grid.Column>
            <TodoApp />
          </Grid.Column>
        </div>
      </Grid>
    </>
  );
};

export default TopPage;

// style={{ position: "fixed", right: 0, top: 0 }}
