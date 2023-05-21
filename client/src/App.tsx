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

const us: User = {
  id: 6,
  name: "fesmifes",
  surname: "gesgse",
  adress: "esefesfes",
  phonenumber: 478965,
  email: "Esesgesg",
  company: "Esfefae",
  contract: 6,
};

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
      body: JSON.stringify({ ...us }),
    });
    // Парсим полученный JSON
    const json: User[] = await res.json();
    // Обновляем state
    setJsonData(json);
  };

  const Home = () => <h2>Главная</h2>;

  return (
    <div className="App-header">
      <h1 className="Head1">Автоматизированная система учета клиентов строительной компании</h1>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <BrowserRouter>
          <Route path="/">
            <Link to="/">Главная</Link>
            <Home />
          </Route>
        </BrowserRouter>
        <button className="Butt" onClick={sendRequest}>
          Список клиентов
        </button>
        <button className="Butt" onClick={sendRequest2}>
          Список клиентов 2
        </button>
        <button className="Butt" onClick={sendRequest3}>
          Добавить нового клиента
        </button>
        <button className="Butt" onClick={sendRequest}>
          Изменить запись в таблице
        </button>
        <button className="Butt" onClick={sendRequest}>
          Удалить клиента из таблицы
        </button>
      </div>
      <form onSubmit={sendRequest3}>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Surname:
          <input type="text" name="surname" />
        </label>
        <label>
          Adress:
          <input type="text" name="adress" />
        </label>
        <label>
          Phonenumber:
          <input type="text" name="phonenumber" />
        </label>
        <label>
          email:
          <input type="text" name="email" />
        </label>
        <label>
          Company:
          <input type="text" name="company" />
        </label>
        <label>
          Contract:
          <input type="text" name="contract" />
        </label>
        <input type="submit" value="Submit" />
      </form>

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
