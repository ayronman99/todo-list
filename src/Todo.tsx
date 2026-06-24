import { useContext, memo, useState } from "react";
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
  Button,
  Typography,
  Box,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

function Todo(props: TodoShape): ReactElement {
  const dispatchTodos = useContext(
    DispatcherContext,
  ) as dispatcherHandler<TodoActionObjectType>;
  const { task, id, completed } = props;

  const deleteTodoHandler = (evt: SyntheticEvent) => {
    evt.stopPropagation();
    dispatchTodos({ type: "REMOVE", id: id });
  };

  const toggleTodoHandler = (evt: SyntheticEvent) => {
    evt.stopPropagation();
    dispatchTodos({ type: "TOGGLE", id: id });
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, toggle] = useToggleState(false);

  const hasOverflow = task.length > 100;
  const previewText = hasOverflow ? `${task.slice(0, 100)}...` : task;
  const displayText = isExpanded ? task : previewText;

  return (
    <ListItem>
      {isEditing ? (
        <UpdateToDoForm id={id} task={task} toggleStateEditForm={toggle} />
      ) : (
        <>
          <Box
            display="flex"
            alignItems="center"
            width="85%"
            gap={1}
            sx={{ minWidth: 0 }}
          >
            <Checkbox
              tabIndex={-1}
              checked={completed}
              onClick={toggleTodoHandler}
            />
            <ListItemText
              sx={{ minWidth: 0 }}
              primary={
                <Typography
                  component="span"
                  variant="body2"
                  sx={{
                    textDecoration: completed ? "line-through" : undefined,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    wordBreak: "break-word",
                    display: "block",
                  }}
                >
                  {displayText}
                </Typography>
              }
              secondary={
                hasOverflow ? (
                  <Button
                    size="small"
                    onClick={() => setIsExpanded((prev) => !prev)}
                  >
                    {isExpanded ? "Show less" : "Show more"}
                  </Button>
                ) : null
              }
            />
          </Box>
          <Box>
            <ListItemSecondaryAction>
              <IconButton aria-label="Delete" onClick={deleteTodoHandler}>
                <DeleteIcon />
              </IconButton>
              <IconButton aria-label="Edit" onClick={toggle}>
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </Box>
        </>
      )}
    </ListItem>
  );
}

export default memo(Todo);
