"use client";

import { useState } from "react";
import TodoItem from "./TodoItem";
import { Todo } from "./types";
import axios from 'axios';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [imgUrl, setImgUrl] = useState(null);

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: inputValue,
          completed: false,
        },
      ]);
      setInputValue("");
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const CatImageDisplay = async () => {
    try {
      const response = await axios.get("https://api.thecatapi.com/v1/images/search");
      const url = response.data[0]?.url;
      if (url) {
        setImgUrl(url);
      }
      else {
        alert("Không có con mòe nào");
      }
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message);
      }
      else {
        console.error(error);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-450 mx-auto h-250 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-blue-500">
          <h1 className="text-2xl font-bold text-white">Todo List</h1>
        </div>
        
        <div className="p-6">
          <div className="flex mb-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              placeholder="Thêm task mới..."
              className="flex-1 px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <button
              onClick={addTodo}
              className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Thêm
            </button>
          </div>

          <div className="space-y-2">
            {todos.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Chưa có task nào, hãy thêm task</p>
            ) : (
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))
            )}
          </div>

          <div className="flex justify-center">
            <button
              onClick={CatImageDisplay}
              className="px-4 py-2 bg-blue-500 text-white rounded-l rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Ảnh con mòe
            </button>
          </div>

          <div className="flex justify-center mt-10">
            {imgUrl && (
              <div>
                <img src={imgUrl} alt="Con mòe" className="max-w-full h-auto rounded"/>
              </div>
            )}
          </div>

          {todos.length > 0 && (
            <div className="mt-4 text-sm text-gray-500">
              {todos.filter(t => t.completed).length} / {todos.length} tasks đã hoàn thành
            </div>
          )}
        </div>
      </div>
    </div>
  );
}