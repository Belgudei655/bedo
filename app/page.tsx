// components/TodoList.tsx
"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ClockComponent from "./components/ClockComponent";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editTodoTitle, setEditTodoTitle] = useState<string>("");

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: Date.now(), title: newTodo, completed: false },
      ]);
      setNewTodo("");
    }
  };

  const handleUpdateTodo = (
    id: number,
    updates: { title?: string; completed?: boolean }
  ) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
    );
    setEditingTodoId(null);
    setEditTodoTitle("");
  };

  const handleEditTodo = (id: number, title: string) => {
    setEditingTodoId(id);
    setEditTodoTitle(title);
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditTodoTitle("");
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex flex-row w-screen">
      <div className="w-1/2 mt-10 ">
        <ClockComponent></ClockComponent>
      </div>
      <div className="w-1/2  border-red-100 flex justify-center ">
        <div className="h-5 mt-20">
          <input
            type="text"
            placeholder="Enter your task here"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="w-64 h-10 rounded-full border border-black p-2"
          />

          <button
            className="w-15 h-10 rounded-full p-2 bg-gray-400 hover:bg-gray-800 ml-1"
            onClick={handleAddTodo}
          >
            Submit
          </button>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                {editingTodoId === todo.id ? (
                  <>
                    <div className="flex flex-row">
                      <input
                        type="text"
                        value={editTodoTitle}
                        onChange={(e) => setEditTodoTitle(e.target.value)}
                        className="w-64 h-10 rounded-full border border-gray-300 p-2"
                      />
                      <button
                        onClick={() =>
                          handleUpdateTodo(todo.id, { title: editTodoTitle })
                        }
                        className="flex items-center justify-center p-2 w-10 h-10 bg-gray-400 rounded-full border transition duration-300 hover:bg-gray-300 text-black-500"
                      >
                        <FontAwesomeIcon icon={faFloppyDisk} />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex items-center justify-center p-2 w-10 h-10 bg-gray-400 rounded-full border transition duration-300 hover:bg-gray-300 text-black-500"
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-row py-1 mt-5">
                      <div className="flex items-center ps-3">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() =>
                            handleUpdateTodo(todo.id, {
                              completed: !todo.completed,
                            })
                          }
                          id={`todo-${todo.id}`}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="react-checkbox-list"
                          className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        ></label>
                      </div>
                      <div className="w-59 h-10 rounded-full border p-2 bg-gray-300">
                        {todo.title}
                      </div>

                      <button
                        onClick={() => handleEditTodo(todo.id, todo.title)}
                        className="flex items-center justify-center p-2 w-10 h-10 bg-gray-400 rounded-full border transition duration-300 hover:bg-blue-300 text-black-500"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="flex items-center justify-center p-2 w-10 h-10 bg-gray-400 rounded-full border transition duration-300 hover:bg-red-300 text-red-500"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
