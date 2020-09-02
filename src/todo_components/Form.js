import React, { useEffect, useContext } from "react";
import { AuthContext } from "../AuthService";
import firebase from "../config/firebase";

import { Button, Input, Grid } from "semantic-ui-react";

const Form = ({ value, setValue, allCheckBox, todos, setTodos }) => {
  const { currentGroup } = useContext(AuthContext);
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

  /**firestoreにtodoデータを追加*/
  const todoData = () => {
    db.collection("todos")
      .doc()
      .set({
        content: value,
        isDone: false,
        groupId: currentGroup,
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
          // ドキュメントが欲しいのはfirebaseのidであって
          // こっちで指定したidではない
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
