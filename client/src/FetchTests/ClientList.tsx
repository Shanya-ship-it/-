//файл описания списка клиента, логика извлечения данных, запрос на сервер и вывод результата

import { useEffect, useMemo, useState } from "react"; //хуки
import { Client, clientFieldMetadata, clientPropertyList } from "./Types";
import { Link } from "react-router-dom";
import { Table, TableColumn } from "../components/Table";

const clientColumns = clientPropertyList.map<TableColumn<Client>>((field) => {
  const meta = clientFieldMetadata[field];
  return { field, title: meta.label, render: meta.format };
});

/** Компонент для отрисовки списка клиентов */
export const ClientList = () => {
  // Данные, полученные из бэка

  //определеяем две переменные [объект, функция] = в клайнтс передается массив Клиентов
  const [clients, setClients] = useState<Client[]>([]);

  const getClients = async () => {
    // Делаем запрос до бэка, фетч для обращения к ресурсам по сети, фетч("источник", объект конфигурации)
    const res = await fetch("http://localhost:8080/clients", {
      //(урл, дополнительные настройки)
      method: "GET",
      headers: { "Content-type": "application/json" }, //тут где-то должен быть токен
    });
    // Парсим полученный JSON
    const json: Client[] = await res.json();
    // Обновляем список клиентов
    setClients(json); //?
  };

  // Загружаем список клиентов на первое открытие страницы (для визуализации объекта)
  useEffect(() => {
    getClients();
  }, []);

  const columns = useMemo(() => {
    const deleteClient = async (id: string) => {
      await fetch(`http://localhost:8080/client/delete/${id}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
      });
      getClients();
    };

    return clientColumns.concat([
      {
        key: "edit",
        field: "id",
        title: "Редактировать",
        render: (id) => (
          <Link to={`/client/edit/${id}`}>
            <button>Редактировать</button>
          </Link>
        ),
      },
      {
        key: "delete",
        field: "id",
        title: "Удалить",
        render: (id) => <button onClick={() => deleteClient(id)}>Удалить</button>,
      },
    ]);
  }, []);

  const [search, setSearch] = useState("");

  const filteredClients = useMemo(() => {
    const searchWords = search.toLowerCase().split(" ");
    const searchFields: (keyof Client)[] = ["firstname", "secondname", "lastname"];

    return clients.filter((client) =>
      searchWords.every((word) => searchFields.some((field) => client[field].toLowerCase().includes(word)))
    );
  }, [clients, search]);

  //здесь происходит красивое отображение моей таблицы
  return (
    <div className="app-tab" style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <button onClick={getClients}>Обновить список клиентов</button>
        <Link to="/client/add">
          <button>Добавить клиента</button>
        </Link>
      </div>
      <div className="form">
        <form className="search_form">
          <input
            type="text"
            placeholder="Поиск..."
            className="search_input"
            onChange={(event) => setSearch(event.target.value)}
          />
        </form>
      </div>
      <div style={{ flex: "1", overflow: "auto" }}>
        <Table<Client> keyField="id" columns={columns} data={filteredClients} />
      </div>
    </div>
  );
};
