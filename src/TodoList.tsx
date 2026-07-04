import { Paper, List, Snackbar, Button, Alert } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import type {
  TodoShape,
  dispatcherHandler,
  TodoActionObjectType,
} from "./@types/todos";
import { TodosContext, DispatcherContext } from "./context/todos.context";
import SortableTodo from "./components/SortableTodo";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";

function TodoList() {
  const todoState = useContext(TodosContext) as TodoShape[];
  const todoStateLength = todoState?.length ?? 0;
  const [_tasks, setTasks] = useState(todoState ?? []);

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
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== todo.id));
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

  const handleItemUpdate = (updatedTodo: TodoShape[]) => {
    dispatchTodos({ type: "REORDER", newOrder: updatedTodo });
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

  useEffect(() => {
    setTasks(todoState ?? []);
  }, [todoState, setTasks]);

  const content =
    todoStateLength >= 1 ? (
      <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) {
            // Reset to server state on cancel
            setTasks(todoState ?? []);
            return;
          }

          // Update local state, then sync with server
          setTasks((items) => {
            const itemMove = move(items, event);
            handleItemUpdate(itemMove);

            return itemMove;
          });
        }}
      >
        <Paper>
          <List>
            {todoState.map((todoItems: TodoShape, index) => (
              <SortableTodo
                todoItems={todoItems}
                id={todoItems.id}
                key={todoItems.id}
                index={index}
                todoStateLength={todoStateLength}
                onDelete={handleDelete}
              />
            ))}
          </List>
        </Paper>
      </DragDropProvider>
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
