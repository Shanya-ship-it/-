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
    <div className="app-tab">
      <h1>Автоматизированная система учета клиентов строительной компании</h1>
      <button onClick={getContract}>Обновить список контрактов</button>
      {/* Превращаем данные в DOM элементы, по div'у на Client'а*/}
      <table className="contract-list">
        <thead className="contract-list-head">
          <tr className="contract-list-row">
            {contractPropertyList.map((field) => (
              <td className="contract-list-item" key={field}>
                {contractFieldMetadata[field].label}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className="contract-list-body">
          {contracts.map((user) => (
            <tr key={user.id} className="contract-list-row">
              {contractPropertyList.map((field) => (
                <td className="contracts-list-item" key={field}>
                  {user[field].toString()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
