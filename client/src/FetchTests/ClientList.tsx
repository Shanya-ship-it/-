//файл описания списка клиента, логика извлечения данных, запрос на сервер и вывод результата

import { useEffect, useState } from "react"; //хуки
import { Client, clientFieldMetadata, clientPropertyList } from "./Types";

/** Компонент для отрисовки списка  */
export const ClientList = () => {
  // Данные, полученные из бэка

  //определеяем две переменные [объект, функция] = в клайнтс передается массив Клиентов,
  const [clients, setClients] = useState<Client[]>([]); //деструктуризация данных

  const getClients = async () => {
    // Делаем запрос до бэка, фетч для обращения к ресурсам по сети, фетч("источник", объект конфигурации)
    const res = await fetch("http://localhost:8080/client", {
      //(урл, дополнительные настройки)
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    // Парсим полученный JSON
    const json: Client[] = await res.json();
    // Обновляем state
    setClients(json); //
  };

  // Загружаем список клиентов на первое открытие страницы (для визуализации объекта)
  useEffect(() => {
    getClients();
  }, []);

  //здесь происходит красивое отображение моей таблицы
  return (
    <div className="app-tab">
      <h1>Автоматизированная система учета клиентов строительной компании</h1>
      <button onClick={getClients}>Обновить список клиентов</button>
      {/* Превращаем данные в DOM элементы, по div'у на Client'а*/}
      <table className="client-list">
        <thead className="client-list-head">
          <tr className="client-list-row">
            {clientPropertyList.map((field) => (
              <td className="client-list-item" key={field}>
                {clientFieldMetadata[field].label}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className="client-list-body">
          {clients.map((user) => (
            <tr key={user.id} className="client-list-row">
              {clientPropertyList.map((field) => (
                <td className="clients-list-item" key={field}>
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
