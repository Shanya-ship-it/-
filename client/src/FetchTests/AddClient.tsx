import React, { useState } from "react";
import { ClientProperties, clientPropertyList, clientFieldMetadata } from "./Types";

export const AddClient = () => {
  // Введенные данные клиента
  const [user, setUser] = useState<ClientProperties>({
    name: "",
    surname: "",
    adress: "",
    company: "",
    contract: 0,
    email: "",
    phonenumber: "",
  });

  const addClient = async () => {
    // Передаем данные в бэк
    await fetch("http://localhost:8080/client", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    });
  };

  return (
    <div className="app-tab">
      <form onSubmit={addClient}>
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
                    value={user[field]}
                    // Подписываемся на изменение значения поля
                    onChange={(ev) => setUser({ ...user, [field]: ev.currentTarget.value })}
                  />
                </td>
              </tr>
            );
          })}
        </table>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
