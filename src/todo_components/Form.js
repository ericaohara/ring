import React, { useState } from "react";
import { Button, Input, Grid } from "semantic-ui-react";

const Form = ({ value, setValue, addTodo, deleteTodo, allCheckBox }) => {
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
              onClick={deleteButton}
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

{
  /* <button onClick={() => {
  console.log(todos);
}}>button</button> */
}
