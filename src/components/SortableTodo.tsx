import { useSortable } from "@dnd-kit/react/sortable";
import Todo from "../Todo";
import type { TodoShape } from "../@types/todos";
import { Divider } from "@mui/material";

type SortableTodoType = {
  id: string | number;
  index: number;
  todoItems: TodoShape;
  todoStateLength: number;
  onDelete: (todo: TodoShape, index: number) => void;
};

function SortableTodo({
  id,
  index,
  todoItems,
  todoStateLength,
  onDelete,
}: SortableTodoType) {
  const { completed } = todoItems;
  const { ref } = useSortable({ id, index, disabled: completed });

  return (
    <>
      <div ref={ref}>
        <Todo
          {...todoItems}
          key={todoItems.id}
          index={index}
          onDelete={onDelete}
        />
        {index < todoStateLength - 1 && <Divider key={todoItems.id + index} />}
      </div>
    </>
  );
}

export default SortableTodo;
