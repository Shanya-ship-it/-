//начальная страница , которая открывается при запуске сервера.

//импорт всякой херни для выведения на экран красивой страницы
import { Route, Routes, BrowserRouter, Link } from "react-router-dom"; //импорт роутов

import "./App.css"; //импорт цсс для красоты
import { ClientList } from "./FetchTests/ClientList";
import { AddClient } from "./FetchTests/AddClient";

const App = () => {
  return (
    <div className="app-main">
      <BrowserRouter>
        <div className="app-links">
          <Link to="/">Начало</Link>
          <Link to="/clients">Список клиентов</Link>
          <Link to="/add">Создать клиента</Link>
        </div>
        <Routes>
          <Route path="/" element={"Hello, World!"} />
          <Route path="/clients" element={<ClientList />} />
          <Route path="/add" element={<AddClient />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
