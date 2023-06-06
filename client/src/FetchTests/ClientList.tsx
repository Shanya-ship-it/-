//файл описания списка клиента, логика извлечения данных, запрос на сервер и вывод результата

import { useEffect, useState } from "react"; //хуки
import { Client, clientFieldMetadata, clientPropertyList } from "./Types";
import { Link } from "react-router-dom";

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

  const deleteClient = async (id: string) => {
    const res = await fetch(`http://localhost:8080/client/delete/${id}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
    });
    getClients();
  };

  // Загружаем список клиентов на первое открытие страницы (для визуализации объекта)
  useEffect(() => {
    getClients();
  }, []);

  //здесь происходит красивое отображение моей таблицы
  return (
    <div className="app-tab" style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <button onClick={getClients}>Обновить список клиентов</button>
        <Link to="/client/add">
          <button>Добавить клиента</button>
        </Link>
        <Link to={`/client/search/`}>
          <button>Поиск клиента</button>
        </Link>
      </div>
      {/* Превращаем данные в DOM элементы, по div'у на Client'а*/}
      <div style={{ flex: "1", overflow: "auto" }}>
        <table className="list">
          <thead className="list-head">
            <tr className="list-row">
              {clientPropertyList.map((field) => (
                <td className="list-item" key={field}>
                  {clientFieldMetadata[field].label}
                </td>
              ))}
              <td className="list-item">Редактировать</td>
              <td className="list-item">Удалить</td>
              <td className="list-item">Поиск</td>
            </tr>
          </thead>
          <tbody className="list-body">
            {clients.map((client) => (
              <tr key={client.id} className="list-row">
                {clientPropertyList.map((field) => (
                  <td className="list-item" key={field}>
                    {client[field]}
                  </td>
                ))}
                <td className="list-item">
                  <Link to={`/client/edit/${client.id}`}>
                    <button>Редактировать</button>
                  </Link>
                </td>
                <td className="list-item">
                  <button onClick={() => deleteClient(client.id)}>Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
