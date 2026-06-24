import { useContext } from "react";
import type { ReactElement } from "react";
import { DispatcherContext } from "./context/todos.context";
import type { dispatcherHandler, TodoActionObjectType } from "./@types/todos";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useInputState from "./hooks/useInputState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { MAX_CHAR } from "./constant";

function UpdateToDoForm(props: {
  id: string;
  task: string;
  toggleStateEditForm: () => void;
}): ReactElement {
  const { id, task, toggleStateEditForm } = props;
  const [value, errorMsg, charCount, handleChange, validate, reset] =
    useInputState(task, MAX_CHAR);
  const dispatchTodos = useContext(
    DispatcherContext,
  ) as dispatcherHandler<TodoActionObjectType>;

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!validate()) {
      return;
    }
    dispatchTodos({ type: "UPDATE", id: id, newTask: value });
    reset();
    toggleStateEditForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ width: "100%" }}
      className="is-flex is-justify-content-space-between"
    >
      <div style={{ width: "100%" }}>
        <TextField
          margin="normal"
          value={value}
          onChange={handleChange}
          fullWidth
          inputProps={{ maxLength: MAX_CHAR }}
        />
        <div className="is-flex is-justify-content-space-between">
          <span style={{ color: errorMsg ? "red" : "inherit" }}>
            {errorMsg}
          </span>
          <span>{`${charCount}/${MAX_CHAR}`}</span>
        </div>
      </div>
      <Button type="submit" disabled={!value.trim()}>
        <FontAwesomeIcon icon={faFloppyDisk} className="is-size-4" />
      </Button>
    </form>
  );
}

export default UpdateToDoForm;
