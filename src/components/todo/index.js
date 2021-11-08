import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "./todo.css";

const ToDo = ({ toDo, completeChange }) => {
  console.log(toDo);
  return (
    <FormControlLabel
      className={toDo.complete ? "completed" : ""}
      control={
        <Checkbox
          checked={toDo.complete}
          onChange={() => completeChange(toDo)}
        />
      }
      label={toDo.task}
    />
  );
};

export default ToDo;
