import { useEffect, useState } from "react";
import { Client, clientFieldMetadata, clientPropertyList } from "./Types";

/** Компонент для отрисовки списка  */
export const ClientList = () => {
  // Данные, полученные из бэка
  const [clients, setClients] = useState<Client[]>([]);

  const getClients = async () => {
    // Делаем запрос до бэка
    const res = await fetch("http://localhost:8080/client", {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    // Парсим полученный JSON
    const json: Client[] = await res.json();
    // Обновляем state
    setClients(json);
  };

  // Загружаем список клиентов на первое открытие страницы
  useEffect(() => {
    getClients();
  }, []);

  return (
    <div className="app-tab">
      <h1>АСУКСТ</h1>
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
                <td className="client-list-item" key={field}>
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
