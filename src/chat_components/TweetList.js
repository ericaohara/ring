import React from "react";
import TweetItem from "./TweetItem";

const TweetList = ({ tweets, imageUrl, deleteTweet }) => {
  return (
    <>
      {tweets.map((tweet) => {
        return (
          <TweetItem
            content={tweet.content}
            time={tweet.time}
            imageUrl={imageUrl}
            id={tweet.id}
            deleteTweet={deleteTweet}
          />
        );
      })}
    </>
  );
};

export default TweetList;
