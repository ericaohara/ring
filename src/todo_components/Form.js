import React, { useEffect } from "react";
import firebase from "../config/firebase";
import shortid from "shortid";

import { Button, Input, Grid } from "semantic-ui-react";

const Form = ({ value, setValue, allCheckBox, todos, setTodos, id }) => {
  // 追加

  // 追加
  const onButtonClick = (e) => {
    e.preventDefault();
    // addTodo(value);
    if (value === "") {
      return;
    }
    todoData();
    setValue("");
  };

  // 削除
  // const deleteButton = (e) => {
  //   e.preventDefault();
  //   deleteTodo();
  // };

  // 全選択
  const allSelectButton = (e) => {
    e.preventDefault();
    allCheckBox();
  };

  // firebase
  const db = firebase.firestore();

  // firestoreにデータを追記
  const todoData = () => {
    const id = shortid.generate();

    db.collection("todos")
      .doc(id)
      .set({
        content: value,
        isDone: false,
        id: id,
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
      .onSnapshot((snapshot) => {
        const todo = snapshot.docs.map((doc) => {
          return doc.data();
        });
        setTodos(todo);
      });
  }, []);

  // 削除
  // const deleteTodo = () => {
  // todosからisDoneを参照(ループ)
  // isDoneがfalse(未チェック)のものをリストに残す(消さない)
  //   setTodos(todos.filter((todo) => todo.isDone !== true)); // true
  // };

  const deleteTodo = () => {
    todos
      // isDoneがtrueだったら
      .filter(({ isDone }) => isDone)
      // idを探して削除
      .forEach(({ id }) => {
        db.collection("todos")
          //   // ドキュメントが欲しいのはfirebaseのidであって
          //   // こっちで指定したidではない
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
      <Grid>
        <Grid.Row columns={4}>
          <Grid.Column>
            <Button
              basic
              circular
              icon="trash alternate outline"
              onClick={deleteTodo}
            />
          </Grid.Column>
          <Grid.Column>
            <Button basic circular icon="check" onClick={allSelectButton} />
          </Grid.Column>
          <Grid.Column>
            <Button basic circular icon="edit" onClick={onButtonClick} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default Form;
