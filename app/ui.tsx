"use client";
import { Button, Input } from "@material-tailwind/react";
import Todo from "./components/todo";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTodo, getTodoList } from "./actions/todo-actions";

export default function UI() {
  const [searchInput, setSearchInput] = useState("");

  const todoListQuery = useQuery({
    queryKey: ["todoList"],
    queryFn: () => getTodoList({ searchInput }),
  });

  const createTodoQuery = useMutation({
    mutationKey: ["createTodo"],
    mutationFn: () =>
      createTodo({
        title: "",
        completed: false,
        created_at: new Date().toISOString(),
      }),
    onSuccess: () => {
      todoListQuery.refetch();
    },
  });

  return (
    <div className="w-2/3 mx-auto items-center gap-2 py-10 flex flex-col">
      <h1 className="text-xl"> TODO LIST</h1>
      <Input
        label="Search Todo"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search Todo"
        icon={<i className="fas fa-search" />}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
      />

      {todoListQuery.isLoading && <div>Loading...</div>}
      {todoListQuery.data?.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}

      <Button
        onClick={() => createTodoQuery.mutate()}
        loading={createTodoQuery.isPending}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}>
        <i className="fas fa-plus mr-2" />
        Add Todo
      </Button>
    </div>
  );
}
