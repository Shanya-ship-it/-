import React, { useState, useEffect } from "react";
import { Client, clientFieldMetadata, clientPropertyList } from "./Types";

export const Search = () => {
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

  useEffect(() => {
    getClients();
  }, []);

  const [value, setValue] = useState("");

  const filteredClients = clients.filter((client) => {
    return client.firstname.toLowerCase().includes(value.toLowerCase());
  });

  return (
    <div>
      <div className="app-tab" style={{ whiteSpace: "pre-wrap" }}>
        {`Поиск!`}
      </div>
      <div className="form">
        <form className="=search_form">
          <input
            type="text"
            placeholder="search in the clients..."
            className="searc_input"
            onChange={(event) => setValue(event.target.value)}
          />
        </form>
      </div>
      <div style={{ flex: "1", overflow: "auto" }}>
        <table className="list">
          <thead className="list-head">
            <tr className="list-row">
              {filteredClients.map((field) => (
                <td className="list-item" key={field}>
                  {clientFieldMetadata[field].label}
                </td>
              ))}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
