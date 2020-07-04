import React from "react";
import Item from "./Item";

const List = ({ todos, setTodos }) => {
  return (
    <ul style={{ listStyle: "none" }}>
      {todos.map((todo) => {
        return (
          <>
            <Item
              // todo[0].content
              value={todo.content}
              id={todo.id}
              key={todo.id}
              todos={todos}
              setTodos={setTodos}
              isDone={todo.isDone}
            />
          </>
        );
      })}
    </ul>
  );
};

export default List;
