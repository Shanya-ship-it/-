//файл описания списка клиента, логика извлечения данных, запрос на сервер и вывод результата

import { useEffect, useState } from "react"; //хуки
import { ContractJoin, contractJoinFieldMetadata, contractJoinPropertyList } from "./Types";

/** Компонент для отрисовки списка  */
export const ContractJoinList = () => {
  // Данные, полученные из бэка

  //определеяем две переменные [объект, функция] = в клайнтс передается массив Клиентов,
  const [contractsJoin, setContractsJoin] = useState<ContractJoin[]>([]); //деструктуризация данных

  const getContractJoin = async () => {
    // Делаем запрос до бэка, фетч для обращения к ресурсам по сети, фетч("источник", объект конфигурации)
    const res = await fetch("http://localhost:8080/contractsj", {
      //(урл, дополнительные настройки)
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    // Парсим полученный JSON
    const json: ContractJoin[] = await res.json();
    // Обновляем state
    setContractsJoin(json); //
  };

  // Загружаем список клиентов на первое открытие страницы (для визуализации объекта)
  useEffect(() => {
    getContractJoin();
  }, []);

  //здесь происходит красивое отображение моей таблицы
  return (
    <div className="app-tab" style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <button onClick={getContractJoin}>Обновить список контрактов</button>
      </div>
      {/* Превращаем данные в DOM элементы, по div'у на Client'а*/}
      <div style={{ flex: "1", overflow: "auto" }}>
        <table className="list">
          <thead className="list-head">
            <tr className="list-row">
              {contractJoinPropertyList.map((field) => (
                <td className="list-item" key={field}>
                  {contractJoinFieldMetadata[field].label}
                </td>
              ))}
            </tr>
          </thead>
          <tbody className="list-body">
            {contractsJoin.map((contractJoin) => (
              <tr key={contractJoin.id} className="list-row">
                {contractJoinPropertyList.map((field) => {
                  const { format } = contractJoinFieldMetadata[field];
                  const value = contractJoin[field];
                  return (
                    <td className="list-item" key={field}>
                      {format ? format(value) : value.toString()}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
