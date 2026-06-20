import { useContext } from "react";
import { DispatcherContext } from "./context/todos.context";
import type { dispatcherHandler, TodoActionObjectType } from "./@types/todos";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useInputState from "./hooks/useInputState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

function UpdateToDoForm(props: {
  id: string;
  task: string;
  toggleStateEditForm: () => void;
}) {
  const { id, task, toggleStateEditForm } = props;
  const [value, handleChange, reset] = useInputState(task);
  const dispatchTodos = useContext(
    DispatcherContext,
  ) as dispatcherHandler<TodoActionObjectType>;

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
        dispatchTodos({ type: "UPDATE", id: id, newTask: value });
        reset();
        toggleStateEditForm();
      }}
      style={{ width: "100%" }}
      className="is-flex is-justify-content-space-between"
    >
      <TextField
        margin="normal"
        value={value}
        onChange={handleChange}
        fullWidth
      />
      <Button type="submit">
        <FontAwesomeIcon icon={faFloppyDisk} className="is-size-4" />
      </Button>
    </form>
  );
}

export default UpdateToDoForm;
