"use client";
import { Input } from "@material-tailwind/react";
import Todo from "./components/todo";

export default function UI() {
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
      <Todo id={1} completed={false} title="Learn React" />
    </div>
  );
}
