import { useContext } from "react";
import type { ReactElement } from "react";
import { TextField, Paper, Button } from "@mui/material";
import useInputState from "./hooks/useInputState";
import { DispatcherContext } from "./context/todos.context";
import type { dispatcherHandler, TodoActionObjectType } from "./@types/todos";
import { MAX_CHAR } from "./constant";

function TodoForm(): ReactElement {
  const [value, errorMsg, charCount, handleChange, validate, reset] =
    useInputState("", MAX_CHAR);
  const dispatchTodos = useContext(
    DispatcherContext,
  ) as dispatcherHandler<TodoActionObjectType>;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    dispatchTodos({ type: "ADD", task: value });
    reset();
  };

  return (
    <Paper>
      <p style={{ color: "red" }}>{errorMsg}</p>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-evenly gap-2 p-2">
          <TextField
            className="border-5 border-red-300"
            value={value}
            onChange={handleChange}
            label="Add New Todo"
            fullWidth
            inputProps={{ maxLength: MAX_CHAR }}
          />
          <div className="flex flex-col justify-between gap-2">
            <span>{`${charCount}/${MAX_CHAR}`}</span>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="border-5 border-red-300"
              disabled={!value.trim()}
            >
              Enter
            </Button>
          </div>
        </div>
      </form>
    </Paper>
  );
}

export default TodoForm;
