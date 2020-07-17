import React from "react";
import TweetItem from "./TweetItem";

const TweetList = ({ tweets, setTweets }) => {
  // console.log(tweets);

  return (
    <>
      {tweets.map((tweet) => {
        return (
          <TweetItem
            content={tweet.content}
            imageUrl={tweet.image}
            id={tweet.id}
            setTweets={setTweets}
            time={tweet.createdAt.seconds}
          />
        );
      })}
    </>
  );
};

export default TweetList;
