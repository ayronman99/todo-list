import { Paper, List, Divider, Snackbar, Button, Alert } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import type {
  TodoShape,
  dispatcherHandler,
  TodoActionObjectType,
} from "./@types/todos";
import { TodosContext, DispatcherContext } from "./context/todos.context";
import Todo from "./Todo";

function TodoList() {
  const todoState = useContext(TodosContext) as TodoShape[];
  const dispatchTodos = useContext(
    DispatcherContext,
  ) as dispatcherHandler<TodoActionObjectType>;
  const [lastDeleted, setLastDeleted] = useState<{
    todo: TodoShape;
    index: number;
  } | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(7000);
  const autoHideDuration = 7000;

  const handleDelete = (todo: TodoShape, index: number) => {
    dispatchTodos({ type: "REMOVE", id: todo.id });
    setLastDeleted({ todo, index });
    setTimeLeft(autoHideDuration);
    setSnackbarOpen(true);
  };

  const handleUndo = () => {
    if (!lastDeleted) {
      return;
    }

    dispatchTodos({
      type: "RESTORE",
      id: lastDeleted.todo.id,
      task: lastDeleted.todo.task,
      completed: lastDeleted.todo.completed,
      index: lastDeleted.index,
    });
    setLastDeleted(null);
    setSnackbarOpen(false);
  };

  const handleSnackbarClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
    setLastDeleted(null);
  };

  useEffect(() => {
    if (!snackbarOpen) {
      return;
    }

    const intervalMs = 100;
    const timer = window.setInterval(() => {
      setTimeLeft((current) => Math.max(current - intervalMs, 0));
    }, intervalMs);

    return () => {
      window.clearInterval(timer);
    };
  }, [snackbarOpen]);

  const content =
    todoState.length >= 1 ? (
      <Paper>
        <List>
          {todoState.map((todoItems: TodoShape, index) => (
            <div key={todoItems.id}>
              <Todo {...todoItems} index={index} onDelete={handleDelete} />
              {index < todoState.length - 1 && (
                <Divider key={todoItems.id + index} />
              )}
            </div>
          ))}
        </List>
      </Paper>
    ) : (
      <Paper>
        <section className="hero">
          <div className="hero-body">
            <p className="title">Uh Oh! 😔</p>
            <p className="subtitle">You seem to have nothing to do.</p>
          </div>
        </section>
      </Paper>
    );

  return (
    <>
      {content}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={autoHideDuration}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          icon={false}
          sx={{ width: "100%" }}
        >
          Task deleted {Math.ceil(timeLeft / 1000)}s
          <Button color="inherit" size="small" onClick={handleUndo}>
            UNDO
          </Button>
        </Alert>
      </Snackbar>
    </>
  );
}

export default TodoList;
