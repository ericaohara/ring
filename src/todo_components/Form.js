import React from "react";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

const Form = ({ value, setValue, addTodo, deleteTodo, todos, allCheckBox }) => {
  // 追加
  const onButtonClick = (e) => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };

  // 削除
  const deleteButton = (e) => {
    e.preventDefault();
    deleteTodo();
  };

  // 全選択
  const allSelectButton = (e) => {
    e.preventDefault();
    allCheckBox();
  };

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ height: 30, width: 250, fontSize: 18 }}
      />
      <br />
      <br />
      <div>
        <Button onClick={deleteButton}>
          <Icon className="fa fa-trash-alt" />
        </Button>
        <Button onClick={allSelectButton}>
          <Icon className="far fa-check-square" />
        </Button>
        <Button onClick={onButtonClick}>
          <Icon className="fa fa-pencil-alt" />
        </Button>
      </div>
    </>
  );
};

export default Form;

{
  /* <button onClick={() => {
  console.log(todos);
}}>button</button> */
}
