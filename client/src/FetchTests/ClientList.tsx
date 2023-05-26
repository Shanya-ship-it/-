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
    const res = await fetch("http://localhost:8080/client", {
      //(урл, дополнительные настройки)
      method: "GET",
      headers: { "Content-type": "application/json" },
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

  //здесь происходит красивое отображение моей таблицы
  return (
    <div className="app-tab">
      <button onClick={getClients}>Обновить список клиентов</button>
      <Link to="/add">
        <button>Добавить клиента</button>
      </Link>
      {/* Превращаем данные в DOM элементы, по div'у на Client'а*/}
      <table className="list">
        <thead className="list-head">
          <tr className="list-row">
            {clientPropertyList.map((field) => (
              <td className="list-item" key={field}>
                {clientFieldMetadata[field].label}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className="list-body">
          {clients.map((user) => (
            <tr key={user.id} className="list-row">
              {clientPropertyList.map((field) => (
                <td className="list-item" key={field}>
                  {user[field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
