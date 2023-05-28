//начальная страница , которая открывается при запуске сервера.
//тут кноочки и рисование страницы
import { Route, Routes, BrowserRouter } from "react-router-dom"; //импорт роутов

import "./App.css"; //импорт цсс для красоты
import { ClientList } from "./FetchTests/ClientList"; //импорт файла с логикой выполнения запроса для таблицы с клиентами
import { AddClient } from "./FetchTests/AddClient"; //
import { ContractList } from "./FetchTests/Contract";
import { Welcome } from "./FetchTests/Welcome";
import { Header } from "./FetchTests/Header";

//link - привязка урл и пас и описание
//route path - путь урл, элемент - привязка объекта к урл

const App = () => {
  return (
    <div className="app-main">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/main" element={<Welcome />} />
          <Route path="/client" element={<ClientList />} />
          <Route path="/client/add" element={<AddClient />} />
          <Route path="/contracts" element={<ContractList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
