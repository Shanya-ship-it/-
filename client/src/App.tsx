//начальная страница , которая открывается при запуске сервера.

//импорт всякой херни для выведения на экран красивой страницы

import React, { useState, ChangeEvent, FormEvent } from "react"; //похоже на импорт обработчиков событий
import { ReactComponent as Logo } from "./logo.svg"; //импорт лого
import { getData } from "./utils/data-util"; //импорт обработки данных
import FormInput from "./components/form-input/form-input"; //импорт компонентов, которая форма-инпут

import "./App.css"; //импорт цсс для красоты

// TypeScript declarations
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

const App = () => {
  // Данные, полученные из бэка
  const [jsonData, setJsonData] = useState<User[]>([]);

  /** Получение данных */
  const sendRequest = async () => {
    // Делаем запрос до бэка
    const res = await fetch("http://localhost:8080/test", {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    // Парсим полученный JSON
    const json: User[] = await res.json();
    // Обновляем state
    setJsonData(json);
  };

  return (
    <div className="App-header">
      <button onClick={sendRequest}>Send request</button>
      {/* Превращаем данные в DOM элементы, по div'у на User'а*/}
      {jsonData.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          ASFGKHJbsdgjkbnrsg
        </div>
      ))}
    </div>
  );
};

export default App;
