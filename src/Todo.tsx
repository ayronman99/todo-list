import { useContext, memo } from "react";
import type { ReactElement, SyntheticEvent } from "react";
import useToggleState from "./hooks/useToggleState";
import UpdateToDoForm from "./UpdateToDoForm";
import { DispatcherContext } from "./context/todos.context";
import type {
  TodoShape,
  dispatcherHandler,
  TodoActionObjectType,
} from "./@types/todos";
import {
  ListItem,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

function Todo(props: TodoShape): ReactElement {
  const dispatchTodos = useContext(
    DispatcherContext,
  ) as dispatcherHandler<TodoActionObjectType>;
  const { task, id, completed } = props;

  console.log("Render me: ", task);

  const deleteTodoHandler = (evt: SyntheticEvent) => {
    evt.stopPropagation();
    dispatchTodos({ type: "REMOVE", id: id });
  };

  const toggleTodoHandler = (evt: SyntheticEvent) => {
    evt.stopPropagation();
    dispatchTodos({ type: "TOGGLE", id: id });
  };
  const [isEditing, toggle] = useToggleState(false);
  return (
    <ListItem>
      {isEditing ? (
        <UpdateToDoForm id={id} task={task} toggleStateEditForm={toggle} />
      ) : (
        <>
          <Checkbox
            tabIndex={-1}
            checked={completed}
            onClick={toggleTodoHandler}
          />
          <ListItemText
            style={{ textDecoration: completed ? "line-through" : "" }}
          >
            {task}
          </ListItemText>
          <ListItemSecondaryAction>
            <IconButton aria-label="Delete" onClick={deleteTodoHandler}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="Edit" onClick={toggle}>
              <EditIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </>
      )}
    </ListItem>
  );
}

export default memo(Todo);
