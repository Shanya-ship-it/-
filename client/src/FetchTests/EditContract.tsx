//файл описания логики добавления нового клиента
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ContractJoinProperties,
  contractJoinPropertyList,
  contractJoinFieldMetadata,
  ContractJoin,
} from "./Types";

const initialContractjValues: ContractJoin = {
  id: "",
  employeeName: "",
  clientName: "",
  serviceName: "",
  price: 0,
};

export const EditContractJ = () => {
  // Введенные данные клиента
  const [contractj, setContractsJoin] = useState<ContractJoin>(initialContractjValues); // начальное состояние

  const { id } = useParams();

  const getContractJoin = async () => {
    const res = await fetch(`http://localhost:8080/contractj/${id}`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    // Парсим полученный JSON
    const json: ContractJoin = await res.json();
    // Обновляем список клиентов
    setContractsJoin(json); //?
  };

  useEffect(() => {
    getContractJoin();
  }, []);

  const updateContactj = async () => {
    await fetch("http://localhost:8080/constactj", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(contractj),
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
                  value={contractj[field]}
                  // Подписываемся на изменение значения поля, При изменении значения поля ввода вызывается функция setUser, которая обновляет объект user, заменяя значение под ключом, соответствующим значению переменной field, на новое значение, полученное из события onChange
                  onChange={(ev) => setContractsJoin({ ...contractj, [field]: ev.currentTarget.value })}
                />
              </td>
            </tr>
          );
        })}
      </table>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {id && <button onClick={updateContactj}>Редактировать</button>}
      </div>
    </div>
  );
};
