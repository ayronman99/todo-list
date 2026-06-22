import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { Typography, Paper, AppBar, Grid } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { TodosContextProvider } from "./context/todos.context";

function TodoApp() {
  return (
    <Paper
      style={{
        margin: 0,
        padding: 0,
        height: "100vh",
        backgroundColor: "#fff",
      }}
      elevation={0}
    >
      <AppBar color="primary" position="static" style={{ height: "65px" }}>
        <Toolbar>
          <Typography color="#fff">TODOS WITH HOOKS</Typography>
        </Toolbar>
      </AppBar>
      <Grid
        container
        justifyContent="center"
        spacing={0.5}
        style={{ marginTop: "1.5rem" }}
      >
        <Grid item xs={11} md={8} lg={4}>
          <TodosContextProvider>
            <TodoForm />
            <TodoList />
          </TodosContextProvider>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default TodoApp;
