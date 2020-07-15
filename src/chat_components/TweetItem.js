import React, { useContext } from "react";
import firebase from "../config/firebase";
import moment from "moment";
import { AuthContext } from "../AuthService";

import { Button, List, Segment, Grid } from "semantic-ui-react";

const TweetItem = ({ imageUrl, id, content, time }) => {
  const user = useContext(AuthContext);
  const db = firebase.firestore();

  const image = () => {
    return (
      <img
        src={imageUrl}
        alt="uploadImage"
        style={{ height: 250, width: 500 }}
      />
    );
  };

  const deleteData = (id) => {
    db.collection("chat")
      .doc(id)
      .delete()
      .then(() => console.log("削除成功"))
      .catch((err) => console.log(err));
  };

  // メッセージが作成されてからの経過時間がわかる→momentのfromNowメソッド
  const timeFromNow = (timestamp) => moment(timestamp).fromNow();

  return (
    <>
      <Segment vertical>
        <Grid columns={3} divided>
          <Grid.Row stretched>
            <List.Icon src={user.avatar} verticalAlign="middle" />
            <List.Item>
              <List.Header as="a">{user.displayName}</List.Header>
              <List.Content>{content}</List.Content>
              <List.Description style={{ color: "grey" }}>
                <div>{timeFromNow(time)}</div>
              </List.Description>
              <div>{imageUrl ? image() : null}</div>
              <button onClick={() => console.log(time)}>content</button>
              <Button
                circular
                basic
                // floated="right"
                icon="times"
                size="mini"
                color="red"
                onClick={() => {
                  deleteData(id);
                }}
              />
            </List.Item>
          </Grid.Row>
        </Grid>
      </Segment>
    </>
  );
};

export default TweetItem;
