"use client";

import { Checkbox, IconButton, Spinner } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { deleteTodo, updateTodo } from "app/actions/todo-actions";
import { queryClient } from "app/config/react-query-client-provider";
import { useState } from "react";

export default function Todo({ todo }) {
  const [isCompleted, setIsCompleted] = useState(todo.completed);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const updateTodoQuery = useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: () =>
      updateTodo({
        ...todo,
        title: newTitle,
        completed: isCompleted,
      }),
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({
        queryKey: ["todoList"],
      });
    },
  });

  const deleteTodoQuery = useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: () => deleteTodo(todo.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todoList"],
      });
    },
  });

  return (
    <div className="w-full flex items-center gap-1">
      <Checkbox
        checked={isCompleted}
        onChange={async (e) => {
          setIsCompleted(e.target.checked);
          await updateTodoQuery.mutate();
        }}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
      />

      {isEditing ? (
        <input
          onChange={(e) => setNewTitle(e.target.value)}
          type="text"
          className="border-b border-gray-300 pb-1 flex-1"
          defaultValue={todo.title}
        />
      ) : (
        <p className={`flex-1 ${isCompleted && "line-through"}`}>{todo.title}</p>
      )}

      {isEditing ? (
        <IconButton
          onClick={async () => {
            updateTodoQuery.mutate();
          }}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}>
          {updateTodoQuery.isPending ? (
            <Spinner onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
          ) : (
            <i className="fas fa-check" />
          )}
        </IconButton>
      ) : (
        <IconButton
          onClick={() => {
            setIsEditing(true);
          }}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}>
          <i className="fas fa-pen" />
        </IconButton>
      )}

      <IconButton
        onClick={async () => await deleteTodoQuery.mutate()}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}>
        {deleteTodoQuery.isPending ? (
          <Spinner onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
        ) : (
          <i className="fas fa-trash" />
        )}
      </IconButton>
    </div>
  );
}
