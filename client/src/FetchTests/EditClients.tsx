//файл описания логики добавления нового клиента
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClientProperties, clientPropertyList, clientFieldMetadata, Client } from "./Types";

const initialClientValues: Client = {
  id: "",
  id_req: "",
  firstname: "",
  lastname: "",
  secondname: "",
  email: "",
  phoneNumber: "",
  cityname: "",
};

export const EditClient = () => {
  // Введенные данные клиента
  const [client, setClient] = useState<Client>(initialClientValues); // начальное состояние

  const { id } = useParams();

  const addClient = async () => {
    // Передаем данные в бэк
    await fetch("http://localhost:8080/client", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(client), //джсон стринггифай переводит данные в жсон формат
    });
  };

  const getClient = async () => {
    const res = await fetch(`http://localhost:8080/client/${id}`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    // Парсим полученный JSON
    const json: Client = await res.json();
    // Обновляем список клиентов
    setClient(json); //?
  };

  useEffect(() => {
    getClient();
  }, []);

  const updateClient = async () => {
    await fetch("http://localhost:8080/client", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(client),
    });
  };

  return (
    <div className="app-tab">
      <table>
        {clientPropertyList.map((field) => {
          const { label, type } = clientFieldMetadata[field];
          return (
            <tr key={field}>
              <td style={{ textAlign: "right" }}>
                <label htmlFor={field}>{label}:</label>
              </td>
              <td>
                <input
                  type={type}
                  name={field}
                  // Передаем в поле ввода текущее значение
                  value={client[field]}
                  // Подписываемся на изменение значения поля, При изменении значения поля ввода вызывается функция setUser, которая обновляет объект user, заменяя значение под ключом, соответствующим значению переменной field, на новое значение, полученное из события onChange
                  onChange={(ev) => setClient({ ...client, [field]: ev.currentTarget.value })}
                />
              </td>
            </tr>
          );
        })}
      </table>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {id && <button onClick={updateClient}>Редактировать</button>}
      </div>
    </div>
  );
};
