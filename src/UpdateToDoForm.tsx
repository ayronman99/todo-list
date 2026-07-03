import { useContext, useState } from "react";
import type { ReactElement } from "react";
import { DispatcherContext } from "./context/todos.context";
import type { dispatcherHandler, TodoActionObjectType } from "./@types/todos";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useInputState from "./hooks/useInputState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faClose } from "@fortawesome/free-solid-svg-icons";
import { MAX_CHAR, MAX_CHAR_ERROR_MSG } from "./constant";
import {
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function UpdateToDoForm(props: {
  id: string;
  task: string;
  toggleStateEditForm: () => void;
}): ReactElement {
  const { id, task, toggleStateEditForm } = props;
  const [value, errorMsg, charCount, handleChange, validate, reset] =
    useInputState(task, MAX_CHAR);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const dispatchTodos = useContext(
    DispatcherContext,
  ) as dispatcherHandler<TodoActionObjectType>;

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!validate()) {
      return;
    }
    setIsConfirmOpen(true);
  };

  const confirmEditHandler = () => {
    dispatchTodos({ type: "UPDATE", id: id, newTask: value });
    reset();
    toggleStateEditForm();
    setIsConfirmOpen(false);
  };

  const closeConfirmDialog = () => {
    setIsConfirmOpen(false);
  };

  const CHAR_LEN_CHECK = charCount >= MAX_CHAR ? MAX_CHAR_ERROR_MSG : "";

  return (
    <form
      onSubmit={handleSubmit}
      style={{ width: "100%" }}
      className="flex justify-between"
    >
      <div style={{ width: "100%" }}>
        <TextField
          margin="normal"
          value={value}
          onChange={handleChange}
          fullWidth
          inputProps={{ maxLength: MAX_CHAR }}
        />
        <div className="flex justify-between">
          <Typography component="span" variant="body2" sx={{ color: "red" }}>
            {errorMsg || CHAR_LEN_CHECK}
          </Typography>
          <Typography component="span" variant="body2" color="textSecondary">
            {`${charCount}/${MAX_CHAR}`}
          </Typography>
        </div>
      </div>
      <Button type="button" onClick={toggleStateEditForm}>
        <FontAwesomeIcon icon={faClose} className="is-size-4" />
      </Button>
      <Button type="submit" disabled={!value.trim()}>
        <FontAwesomeIcon icon={faFloppyDisk} className="is-size-4" />
      </Button>
      <Dialog open={isConfirmOpen} onClose={closeConfirmDialog}>
        <DialogTitle>Confirm edit?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Save the updated task text to your list?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDialog}>Cancel</Button>
          <Button onClick={confirmEditHandler} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}

export default UpdateToDoForm;
