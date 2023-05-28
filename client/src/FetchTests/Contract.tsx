//файл описания списка клиента, логика извлечения данных, запрос на сервер и вывод результата

import { useEffect, useState } from "react"; //хуки
import { Contract, contractFieldMetadata, contractPropertyList } from "./Types";

/** Компонент для отрисовки списка  */
export const ContractList = () => {
  // Данные, полученные из бэка

  //определеяем две переменные [объект, функция] = в клайнтс передается массив Клиентов,
  const [contracts, setContracts] = useState<Contract[]>([]); //деструктуризация данных

  const getContract = async () => {
    // Делаем запрос до бэка, фетч для обращения к ресурсам по сети, фетч("источник", объект конфигурации)
    const res = await fetch("http://localhost:8080/contracts", {
      //(урл, дополнительные настройки)
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    // Парсим полученный JSON
    const json: Contract[] = await res.json();
    // Обновляем state
    setContracts(json); //
  };

  // Загружаем список клиентов на первое открытие страницы (для визуализации объекта)
  useEffect(() => {
    getContract();
  }, []);

  //здесь происходит красивое отображение моей таблицы
  return (
    <div className="app-tab" style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <button onClick={getContract}>Обновить список контрактов</button>
      </div>
      {/* Превращаем данные в DOM элементы, по div'у на Client'а*/}
      <div style={{ flex: "1", overflow: "auto" }}>
        <table className="list">
          <thead className="list-head">
            <tr className="list-row">
              {contractPropertyList.map((field) => (
                <td className="list-item" key={field}>
                  {contractFieldMetadata[field].label}
                </td>
              ))}
            </tr>
          </thead>
          <tbody className="list-body">
            {contracts.map((contract) => (
              <tr key={contract.id} className="list-row">
                {contractPropertyList.map((field) => {
                  const { format } = contractFieldMetadata[field];
                  const value = contract[field];
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
