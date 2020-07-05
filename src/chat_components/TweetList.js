import React from "react";
import TweetItem from "./TweetItem";

const TweetList = ({ tweets, deleteTweet }) => {
  return (
    <>
      {tweets.map((tweet) => {
        return (
          <TweetItem
            content={tweet.content}
            time={tweet.time}
            imageUrl={tweet.image}
            id={tweet.id}
            deleteTweet={deleteTweet}
          />
        );
      })}
    </>
  );
};

export default TweetList;
