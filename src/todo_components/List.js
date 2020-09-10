import React from "react";
import Item from "./Item";

// import { List } from "semantic-ui-react";

const List = ({ todos, setTodos }) => {
  return (
    <ul style={{ listStyle: "none", padding: 0, width: 200, margin: 16 }}>
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
              userId={todo.createdBy}
            />
          </>
        );
      })}
    </ul>
  );
};

export default List;
