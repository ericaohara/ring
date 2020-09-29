import React, { useState } from "react";
import Form from "./Form";
import List from "./List";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");

  // 全選択
  const allCheckBox = () => {
    const allSelect = todos.map((todo) => {
      return { ...todo, isDone: !todo.isDone };
    });
    setTodos(allSelect);
  };

  return (
    <div>
      <div>
        <h1>TodoList</h1>
        <Form
          value={value}
          setValue={setValue}
          setTodos={setTodos}
          todos={todos}
          setTodos={setTodos}
          allCheckBox={allCheckBox}
        />
        <List todos={todos} setTodos={setTodos} value={value} />
      </div>
    </div>
  );
};

export default TodoApp;
