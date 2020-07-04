import React, { useState } from "react";
import Form from "./Form";
import List from "./List";
import shortid from "shortid";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  // Appでpush(チェックした状態)を管理すると一部変えた時に一括で変わってしまうから不採用
  // const [push, setPush] = useState(false)

  // 追加
  const addTodo = (value) => {
    if (value === "") {
      return;
    } else {
      setTodos([
        ...todos,
        { content: value, id: shortid.generate(), isDone: false },
      ]);
    }
  };

  // 削除
  const deleteTodo = () => {
    // todosからisDoneを参照(ループ)
    // isDoneがfalse(未チェック)のものをリストに残す(消さない)
    setTodos(todos.filter((todo) => todo.isDone !== true)); // true
  };

  // 全選択
  const allCheckBox = () => {
    const allSelect = todos.map((todo) => {
      // 全部選択するだけでいいからtrueに設定
      return { ...todo, isDone: true };
    });
    setTodos(allSelect);
  };

  return (
    <>
      <h1 style={{}}>TodoList</h1>

      <Form
        value={value}
        setValue={setValue}
        addTodo={addTodo}
        deleteTodo={deleteTodo}
        todos={todos}
        setTodos={setTodos}
        allCheckBox={allCheckBox}
      />
      <List todos={todos} setTodos={setTodos} value={value} />
    </>
  );
};

export default TodoApp;

/*<button onClick={() => {
  console.log(todos);
}}>ボタン</button>*/
