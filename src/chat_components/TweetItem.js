import React, { useContext } from "react";
import { AuthContext } from "../AuthService";

import { Button, Comment } from "semantic-ui-react";

const TweetItem = ({ content, time, imageUrl, deleteTweet, id }) => {
  const image = () => {
    return (
      <img
        src={imageUrl}
        alt="uploadImage"
        style={{ height: 250, width: 500 }}
      />
    );
  };

  const onDeleteClick = () => {
    deleteTweet(id);
  };

  const user = useContext(AuthContext);

  return (
    <>
      <Comment>
        <Comment.Avatar src={user.avatar} />
        <Comment.Content>
          <Comment.Author as="a">{user.displayName}</Comment.Author>
          <Comment.Text>{content}</Comment.Text>
          <Comment.Metadata style={{ color: "grey" }}>
            <div>{time}</div>
          </Comment.Metadata>
          <Comment.Text>{imageUrl ? image() : null}</Comment.Text>
          <Button
            circular
            basic
            icon="times"
            size="mini"
            color="red"
            onClick={onDeleteClick}
          />
        </Comment.Content>
      </Comment>
    </>
  );
};

export default TweetItem;
