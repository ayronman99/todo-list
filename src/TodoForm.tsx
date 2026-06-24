import { useContext } from "react";
import type { ReactElement } from "react";
import { TextField, Paper, Button, Typography, Box } from "@mui/material";
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
      <Typography component="p" variant="body2" sx={{ color: "red" }}>
        {errorMsg}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box className="flex justify-evenly content-center gap-2">
          <TextField
            value={value}
            onChange={handleChange}
            label="Add New Todo"
            fullWidth
            inputProps={{ maxLength: MAX_CHAR }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!value.trim()}
          >
            Enter
          </Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", pr: 2 }}>
          <Typography component="span" variant="body2" color="textSecondary">
            {`${charCount}/${MAX_CHAR}`}
          </Typography>
        </Box>
      </form>
    </Paper>
  );
}

export default TodoForm;
