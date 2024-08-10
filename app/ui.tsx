"use client";
import { Button, Input } from "@material-tailwind/react";
import Todo from "./components/todo";
import { useState } from "react";

export default function UI() {
  const [todos, setTodos] = useState([{ id: 1, title: "Learn React", completed: false }]);
  return (
    <div className="w-2/3 mx-auto items-center gap-2 py-10 flex flex-col">
      <h1 className="text-xl"> TODO LIST</h1>
      <Input
        label="Search Todo"
        placeholder="Search Todo"
        icon={<i className="fas fa-search" />}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
      />

      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}

      <Button
        onClick={() =>
          setTodos([
            ...todos,
            {
              id: todos.length + 1,
              title: `Todo ${todos.length + 1}`,
              completed: false,
            },
          ])
        }
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}>
        <i className="fas fa-plus mr-2" />
        Add Todo
      </Button>
    </div>
  );
}
