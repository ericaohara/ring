import React from "react";
import TweetItem from "./TweetItem";

const TweetList = ({ tweets, setTweets }) => {
  return (
    <>
      {tweets.map((tweet) => {
        return (
          <TweetItem
            content={tweet.content}
            imageUrl={tweet.image}
            id={tweet.id}
            groupId={tweet.groupId}
            setTweets={setTweets}
            time={tweet.createdAt}
          />
        );
      })}
    </>
  );
};

export default TweetList;
