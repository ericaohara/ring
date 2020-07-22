import React, { useContext } from "react";
import firebase, { storage } from "../config/firebase";
import moment from "moment";
import { AuthContext } from "../AuthService";

import { Button, List, Segment, Grid, Image } from "semantic-ui-react";

const TweetItem = ({ imageUrl, id, content, time }) => {
  const user = useContext(AuthContext);
  const db = firebase.firestore();

  const image = () => {
    return (
      <>
        <Image centered src={imageUrl} alt="uploadImage" size="medium" />
      </>
    );
  };

  const deleteData = (id) => {
    db.collection("chat")
      .doc(id)
      .delete()
      .then(() => console.log("削除成功"))
      .catch((err) => console.log(err));

    // const desertRef = storage.ref(`/images/${images.name}`);
    // desertRef
    //   .delete()
    //   .then(() => {
    //     console.log("画像削除成功");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  // メッセージが作成されてからの経過時間がわかる→momentのfromNowメソッド
  // moment使わない方がいいかも？
  const timeFromNow = (timestamp) => moment(timestamp).fromNow();

  return (
    <>
      <Segment className="tweet__list">
        <Grid>
          <Grid.Row stretched>
            <List.Icon src={user.photoURL} verticalAlign="middle" />
            <List size="big">
              <List.Item className="tweet__item">
                <List.Header as="a">{user.displayName}</List.Header>
                <List.Content style={{ margin: "30px 0" }}>
                  {content}
                </List.Content>
                <div>{imageUrl ? image() : null}</div>
                <List.Description style={{ color: "grey" }}>
                  <div>{timeFromNow(time)}</div>
                </List.Description>
                {/* <button onClick={() => console.log(time)}>content</button> */}
                <Button
                  circular
                  basic
                  icon="times"
                  size="mini"
                  color="gray"
                  className="tweet__delete"
                  onClick={() => {
                    deleteData(id);
                  }}
                />
              </List.Item>
            </List>
          </Grid.Row>
        </Grid>
      </Segment>
    </>
  );
};

export default TweetItem;
