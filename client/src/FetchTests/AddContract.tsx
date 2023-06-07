//файл описания логики добавления нового клиента
import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  ContractJoinProperties,
  ContractJoin,
  contractJoinFieldMetadata,
  contractJoinPropertyList,
} from "./Types";

const initialContractJoinValues: ContractJoinProperties = {
  employeeName: "",
  clientName: "",
  serviceName: "",
  price: 0,
};

export const AddContract = () => {
  // Введенные данные клиента
  const [contract, setContarct] = useState<ContractJoinProperties>(initialContractJoinValues); // начальное состояние

  const [id, setId] = useState<string | null>(null);

  const AddContract = async () => {
    // Передаем данные в бэк
    await fetch("http://localhost:8080/contractj", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(contract), //джсон стринггифай переводит данные в жсон формат
    });
  };

  return (
    <div className="app-tab">
      <table>
        {contractJoinPropertyList.map((field) => {
          const { label, type } = contractJoinFieldMetadata[field];
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
                  value={contract[field]}
                  // Подписываемся на изменение значения поля, При изменении значения поля ввода вызывается функция setUser, которая обновляет объект user, заменяя значение под ключом, соответствующим значению переменной field, на новое значение, полученное из события onChange
                  onChange={(ev) => setContarct({ ...contract, [field]: ev.currentTarget.value })}
                />
              </td>
            </tr>
          );
        })}
      </table>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button onClick={AddContract}>Создать</button>
      </div>
    </div>
  );
};
