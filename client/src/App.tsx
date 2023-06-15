//начальная страница , которая открывается при запуске сервера.
//тут кноочки и рисование страницы
import { Route, Routes, BrowserRouter, Navigate, useNavigate, useLocation } from "react-router-dom"; //импорт роутов

import { Editor } from "@tinymce/tinymce-react";

import "./App.css"; //импорт цсс для красоты
import React, { useContext, useRef } from "react";
import { Welcome } from "./FetchTests/Welcome";
import { Header } from "./FetchTests/Header";

import { ClientList } from "./FetchTests/ClientList"; //импорт файла с логикой выполнения запроса для таблицы с клиентами
import { AddClient } from "./FetchTests/AddClient"; //
import { EditClient } from "./FetchTests/EditClients";

import { ContractJoinList } from "./FetchTests/ContractJoin";
import { AddContract } from "./FetchTests/AddContract";
import { EditContractJ } from "./FetchTests/EditContract";

import { RequestList } from "./FetchTests/Request";
import { Search } from "./FetchTests/Search";
import { SearchTest } from "./FetchTests/SearchTest";
import { Editordoc } from "./FetchTests/Editordoc";

//
//link - привязка урл и пас и описание
//route path - путь урл, элемент - привязка объекта к урл
const App = () => {
  return (
    <div className="app-main">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/main" element={<Welcome />} />
          <Route path="/clients" element={<ClientList />} />
          <Route path="/client/add" element={<AddClient />} />
          <Route path="/client/edit/:id?" element={<EditClient />} />
          <Route path="/contractsj" element={<ContractJoinList />} />
          <Route path="/contractj/add" element={<AddContract />} />
          <Route path="/contractsj/edit/:id?" element={<EditContractJ />} />
          <Route path="/requests" element={<RequestList />} />
          <Route path="/search" element={<SearchTest />} />
          <Route path="/print" element={<Editordoc />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
