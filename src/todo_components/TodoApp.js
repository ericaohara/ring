import React, { useState } from "react";
import Form from "./Form";
import List from "./List";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  // Appでpush(チェックした状態)を管理すると一部変えた時に一括で変わってしまうから不採用
  // const [push, setPush] = useState(false)

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
        setTodos={setTodos}
        todos={todos}
        setTodos={setTodos}
        allCheckBox={allCheckBox}
      />
      <List todos={todos} setTodos={setTodos} value={value} />
    </>
  );
};

export default TodoApp;
