import { UserProperties, userPropertyList, userFieldMetadata } from "./Types";
import React, { useState } from "react";

const initialUserValues: UserProperties = {
  login: "",
  password: "",
};

export const RegUser = () => {
  const [user, setUser] = useState<UserProperties>(initialUserValues); // начальное состояние

  /*const addUser = async () => {
    // Передаем данные в бэк
    await fetch("http://localhost:8080/user", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user), //джсон стринггифай переводит данные в жсон формат
    });
    console.log("тык по Создать");
  };*/

  const loginUser = async () => {
    console.log("тык по Войти");
    console.log(user);

    await fetch("http://localhost:8080/user", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    });
    console.log("тык по Войти");
    console.log(user);
  };

  return (
    <div className="app-tab">
      <table>
        {userPropertyList.map((field) => {
          const { label, type } = userFieldMetadata[field];
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
                  // Подписываемся на изменение значения поля, При изменении значения поля ввода вызывается функция setUser, которая обновляет объект user, заменяя значение под ключом, соответствующим значению переменной field, на новое значение, полученное из события onChange
                  onChange={(ev) => setUser({ ...user, [field]: ev.currentTarget.value })}
                />
              </td>
            </tr>
          );
        })}
      </table>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button>Создать</button>
        {<button onClick={loginUser}>Войти</button>}
      </div>
    </div>
  );
};
