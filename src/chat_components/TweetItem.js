import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { DialogContent } from "@material-ui/core";

const TweetItem = ({ content, time, imageUrl, deleteTweet, id }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));

  const classes = useStyles();

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

  return (
    <div style={{ marginLeft: 10, marginTop: 30 }}>
      <List className={classes.root}>
        <ListItem>
          <ListItemAvatar>
            <ListItemText secondary="name" />
            <Avatar />
          </ListItemAvatar>
          <ListItemText secondary={time}>{content}</ListItemText>
          <Button onClick={onDeleteClick}>削除</Button>
        </ListItem>
        {imageUrl ? image() : null}
        <Divider variant="inset" component="li" />
      </List>
    </div>
  );
};

export default TweetItem;
