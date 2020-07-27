import React from "react";
import TweetItem from "./TweetItem";

const TweetList = ({ tweets, setTweets }) => {
  return (
    <>
      {tweets.map((tweet) => {
        return (
          <TweetItem
            name={tweet.user.name}
            content={tweet.content}
            avatar={tweet.user.avatar}
            imageUrl={tweet.image}
            id={tweet.id}
            userId={tweet.user.id}
            setTweets={setTweets}
            time={tweet.createdAt}
          />
        );
      })}
    </>
  );
};

export default TweetList;
