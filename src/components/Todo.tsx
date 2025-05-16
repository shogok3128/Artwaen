import React, { useState, useEffect } from 'react';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const Todo: React.FC = () => {
  // 初期タスクの定義
  const initialTodos: TodoItem[] = [
    { id: 1, text: 'ユーザープロフィール編集機能の実装', completed: false },
    { id: 2, text: 'イベント検索フィルターの改善', completed: false },
    { id: 3, text: 'ポートフォリオアップロード機能のUI設計', completed: false },
    { id: 4, text: 'いいね機能のデータベース設計', completed: false },
    { id: 5, text: 'メッセージ機能のバックエンド実装', completed: false },
    { id: 6, text: '通知システムのテスト', completed: false },
    { id: 7, text: 'レスポンシブデザインの調整', completed: false }
  ];

  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  
  // ローカルストレージからTodoを読み込むか、初期タスクを使用
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    } else {
      setTodos(initialTodos);
    }
  }, []);
  
  // Todoが更新されたらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  
  // 新しいTodoを追加
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo: TodoItem = {
        id: Date.now(),
        text: inputValue,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };
  
  // Todoの完了状態を切り替え
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  // Todoを削除
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  // Enter キーでTodoを追加
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };
  
  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">今日のToDo</h2>
      
      <div className="flex mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="新しいタスクを入力..."
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          追加
        </button>
      </div>
      
      <ul className="space-y-2">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`flex items-center justify-between p-3 border rounded-lg ${
              todo.completed ? 'bg-gray-100' : 'bg-white'
            }`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="mr-3 h-5 w-5 text-blue-500"
              />
              <span
                className={`${
                  todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
                }`}
              >
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
      
      {todos.length > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          {todos.filter(todo => todo.completed).length}／{todos.length} 完了
        </div>
      )}
    </div>
  );
};

export default Todo; 