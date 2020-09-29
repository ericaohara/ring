import React, { useContext } from "react";
import { AuthContext } from "../AuthService";

import { Checkbox, List } from "semantic-ui-react";

const Item = ({ value, todos, setTodos, isDone, id, userId }) => {
  const { user } = useContext(AuthContext);

  const onClickSelect = (e) => {
    const checkedTodos = todos.map((todo) => {
      if (e.target.id === todo.id) {
        return { ...todo, isDone: !todo.isDone };
      } else {
        return todo;
      }
    });
    setTodos(checkedTodos);
  };

  return (
    <>
      {user && (
        <>
          {user.uid === userId && (
            <>
              <div style={{ fontSize: "18px", marginTop: "20px" }}>
                <Checkbox
                  color="blue"
                  checked={isDone}
                  id={id}
                  onClick={onClickSelect}
                  style={{ margin: "0 10px" }}
                />
                <span
                  style={{
                    textDecoration: isDone ? "line-through" : "none",
                  }}
                >
                  {value}
                </span>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Item;
