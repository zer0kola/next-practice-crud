"use client";

import { Checkbox, IconButton } from "@material-tailwind/react";
import { useState } from "react";

export default function Todo({ id, title, completed, ...props }) {
  const [isCompleted, setIsCompleted] = useState(completed);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  return (
    <div className="w-full flex items-center gap-1">
      <Checkbox
        checked={isCompleted}
        onChange={() => setIsCompleted(!isCompleted)}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
      />

      {isEditing ? (
        <input
          onChange={(e) => setNewTitle(e.target.value)}
          type="text"
          className="border-b border-gray-300 pb-1 flex-1"
          defaultValue={title}
        />
      ) : (
        <p className={`flex-1 ${isCompleted && "line-through"}`}>{title}</p>
      )}

      {isEditing ? (
        <IconButton
          onClick={() => setIsEditing(!isEditing)}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}>
          <i className="fas fa-check" />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => setIsEditing(!isEditing)}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}>
          <i className="fas fa-pen" />
        </IconButton>
      )}

      <IconButton
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}>
        <i className="fas fa-trash" />
      </IconButton>
    </div>
  );
}
