import React, { useState } from "react";
import { Button, Grid, Header, Segment, Portal } from "semantic-ui-react";

export const AlertModal = ({ title, text, open, close }) => {
  return (
    <Grid columns={2}>
      <Grid.Column>
        <Portal onClose={close} open={open}>
          <Segment
            style={{
              left: "50%",
              position: "fixed",
              top: "50%",
              zIndex: 1000,
            }}
          >
            <Header>{title}</Header>
            <p>{text}</p>

            <Button content="Close Portal" negative onClick={close} />
          </Segment>
        </Portal>
      </Grid.Column>
    </Grid>
  );
};
