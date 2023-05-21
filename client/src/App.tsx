//начальная страница , которая открывается при запуске сервера.

//импорт всякой херни для выведения на экран красивой страницы

import React, { useState, ChangeEvent, FormEvent } from "react"; //похоже на импорт обработчиков событий
import { ReactComponent as Logo } from "./logo.svg"; //импорт лого
import { getData } from "./utils/data-util"; //импорт обработки данных
import FormInput from "./components/form-input/form-input"; //импорт компонентов, которая форма-инпут
import { Route, Router, Routes, BrowserRouter, RouterProvider, Link } from "react-router-dom"; //импорт роутов
import { render } from "react-dom";
import { PageOne, PageTwo } from "./routers";
import { MainPage } from "./mainp";

import "./App.css"; //импорт цсс для красоты
import { isErrored } from "stream";

// TypeScript declarations
interface User {
  //определение типов
  id: number;
  name: string;
  surname: string;
  adress: string;
  phonenumber: number;
  email: string;
  company: string;
  contract: number;
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

  const sendRequest2 = async () => {
    // Делаем запрос до бэка
    const res = await fetch("http://localhost:8080/test2", {
      method: "POST",
      headers: { "Content-type": "application/json" },
    });
    // Парсим полученный JSON
    const json: User[] = await res.json();
    // Обновляем state
    setJsonData(json);
  };

  const sendRequest3 = async () => {
    // Делаем запрос до бэка
    const res = await fetch("http://localhost:8080/test3", {
      method: "POST",
      headers: { "Content-type": "application/json" },
    });
    // Парсим полученный JSON
    const json: User[] = await res.json();
    // Обновляем state
    setJsonData(json);
  };

  return (
    <div className="App-header">
      <h1>АСУКСТ</h1>
      <button onClick={sendRequest}>Send request</button>
      <button onClick={sendRequest2}>Send request2</button>
      <button onClick={sendRequest3}>Send request3</button>

      {/* Превращаем данные в DOM элементы, по div'у на User'а*/}
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Surname</td>
            <td>Adress</td>
            <td>Phonenumber</td>
            <td>Email</td>
            <td>Company</td>
            <td>Contract</td>
          </tr>
        </thead>
        <tbody>
          {jsonData.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.adress}</td>
              <td>{user.phonenumber}</td>
              <td>{user.email}</td>
              <td>{user.company}</td>
              <td>{user.contract}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
