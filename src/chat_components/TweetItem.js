import React, { useContext, useEffect } from "react";
import firebase, { storage } from "../config/firebase";
import moment from "moment";
import { AuthContext } from "../AuthService";

import { Button, List, Segment, Grid, Image } from "semantic-ui-react";

const TweetItem = ({ imageUrl, id, content, time, groupId }) => {
  const { user, users, currentGroup } = useContext(AuthContext);
  const db = firebase.firestore();

  const image = () => {
    return <Image centered src={imageUrl} alt="uploadImage" size="small" />;
  };

  const deleteData = (id) => {
    db.collection("chat")
      .doc(id)
      .get()
      .then((res) => {
        res.ref.delete();
      })
      .catch((err) => console.log(err));

    if (imageUrl) {
      storage.refFromURL(imageUrl).delete();
    }
  };

  const timeFromNow = (timestamp) => moment(timestamp).fromNow();

  /** アバター取得 */
  const displayAvatar = () => {
    if (users && user) {
      const avatar = users.find((pick) => pick.id === user.uid);
      return avatar.avatar;
    }
  };

  /** ユーザーネーム取得 */
  const displayName = () => {
    if (users && user) {
      const name = users.find((pick) => pick.id === user.uid);
      return name.name;
    }
  };

  return (
    <>
      {currentGroup === groupId ? (
        <Segment className="tweet__list">
          <Grid>
            <Grid.Row stretched>
              <List
                divided
                relaxed
                size="big"
                style={{ textDecoration: "none" }}
              >
                <List.Item className="tweet__item">
                  <Image avatar src={displayAvatar()} size="tiny" circular />
                  <List.Content>
                    <div style={{ display: "flex" }}>
                      <div>{displayName()}</div>
                      <List.Description
                        style={{
                          color: "grey",
                          marginLeft: "20px",
                        }}
                      >
                        <div>{timeFromNow(time)}</div>
                      </List.Description>
                    </div>
                    <div style={{ marginTop: 20, fontSize: 18 }}>{content}</div>
                  </List.Content>
                  <div>{imageUrl ? image() : null}</div>
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
      ) : null}
    </>
  );
};

export default TweetItem;
