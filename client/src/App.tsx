//начальная страница , которая открывается при запуске сервера.
//тут кноочки и рисование страницы
import { Route, Routes, BrowserRouter, Link } from "react-router-dom"; //импорт роутов

import "./App.css"; //импорт цсс для красоты
import { ClientList } from "./FetchTests/ClientList"; //импорт файла с логикой выполнения запроса для таблицы с клиентами
import { AddClient } from "./FetchTests/AddClient"; //
import { ContractList } from "./FetchTests/Contract";
import { Welcome } from "./FetchTests/Welcome";

//link - привязка урл и пас и описание
//route path - путь урл, элемент - привязка объекта к урл
const App = () => {
  return (
    <div className="app-main">
      <h2 className="cool-header">Автоматизированная система учета клиентов строительной компании</h2>
      <BrowserRouter>
        <div className="app-links">
          <Link to="/">Начало</Link>
          <Link to="/clients">Клиенты</Link>
          <Link to="/contracts">Договоры</Link>
        </div>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/clients" element={<ClientList />} />
          <Route path="/add" element={<AddClient />} />
          <Route path="/contracts" element={<ContractList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
