import React, { useContext } from "react";
import firebase, { storage } from "../config/firebase";
import moment from "moment";
import { AuthContext } from "../AuthService";

import { Button, List, Segment, Grid, Image } from "semantic-ui-react";

const TweetItem = ({
  imageUrl,
  id,
  content,
  time,
  name,
  avatar,
  userId,
  groupId,
}) => {
  const { user, users, currentGroup } = useContext(AuthContext);
  const db = firebase.firestore();

  const image = () => {
    return (
      <>
        <Image centered src={imageUrl} alt="uploadImage" size="small" />
      </>
    );
  };

  const deleteData = (id) => {
    db.collection("chat")
      .doc(id)
      .delete()
      .then(() => console.log("削除成功"))
      .catch((err) => console.log(err));

    if (imageUrl) {
      storage
        .refFromURL(imageUrl)
        .delete()
        .then(() => {
          console.log("画像削除成功");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const idCheck = () => {
    if (users) {
      const conf = users.find((pull) => user.uid === pull.id);
      return conf.id;
    }
  };
  const timeFromNow = (timestamp) => moment(timestamp).fromNow();

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
                  {users && <Image avatar src={avatar} size="tiny" circular />}
                  <List.Content>
                    <div style={{ display: "flex" }}>
                      <div>{users && name}</div>
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
                  {users && (
                    <>
                      {userId === idCheck() ? (
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
                      ) : null}
                    </>
                  )}
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
