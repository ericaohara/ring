import React, { useEffect, useContext } from "react";
import { AuthContext } from "../AuthService";
import firebase from "../config/firebase";

import { Button, Input, Grid } from "semantic-ui-react";

const Form = ({ value, setValue, allCheckBox, todos, setTodos }) => {
  const { currentGroup, user } = useContext(AuthContext);
  // 追加
  const onButtonClick = (e) => {
    e.preventDefault();
    if (value === "") {
      return;
    }
    todoData();
    setValue("");
  };

  // 全選択
  const allSelectButton = (e) => {
    e.preventDefault();
    allCheckBox();
  };

  // firebase
  const db = firebase.firestore();

  /**firestoreにtodoデータを追加*/
  const todoData = () => {
    db.collection("todos")
      .doc()
      .set({
        content: value,
        isDone: false,
        createdBy: user.uid,
        // groupId: db.doc(`groups/${currentGroup}`),
      })
      .then(() => {
        console.log("todo データ追加成功");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // firebaseに追加した値を取得
  useEffect(() => {
    firebase
      .firestore()
      .collection("todos")
      .orderBy("content")
      .onSnapshot((snapshot) => {
        const todo = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        setTodos(todo);
      });
  }, []);

  const deleteTodo = () => {
    todos
      // isDoneがtrueだったら
      .filter(({ isDone }) => isDone)
      // idを探して削除
      .forEach(({ id }) => {
        db.collection("todos")
          .doc(id)
          .delete()
          .then(() => console.log("todo削除"))
          .catch((err) => console.log(err));
      });
  };

  return (
    <>
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <br />
      <br />
      <Grid style={{ width: "240px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: 0,
            margin: "10px 16px",
          }}
        >
          <div>
            <Button
              basic
              circular
              icon="trash alternate outline"
              onClick={deleteTodo}
            />
          </div>
          <div>
            <Button basic circular icon="check" onClick={allSelectButton} />
          </div>
          <div>
            <Button basic circular icon="edit" onClick={onButtonClick} />
          </div>
        </div>
      </Grid>
    </>
  );
};

export default Form;
