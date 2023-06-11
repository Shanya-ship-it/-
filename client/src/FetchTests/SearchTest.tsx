//файл описания списка клиента, логика извлечения данных, запрос на сервер и вывод результата
import { Link } from "react-router-dom";
import { useEffect, useState } from "react"; //хуки
import { Tables, tablesFieldMetadata, tablesPropertyList } from "./Types";

/** Компонент для отрисовки списка  */
export const SearchTest = () => {
  // Данные, полученные из бэка

  //определеяем две переменные [объект, функция] = в клайнтс передается массив Клиентов,
  const [tables, setTables] = useState<Tables[]>([]); //деструктуризация данных

  const getTables = async () => {
    // Делаем запрос до бэка, фетч для обращения к ресурсам по сети, фетч("источник", объект конфигурации)
    const res = await fetch("http://localhost:8080/search", {
      //(урл, дополнительные настройки)
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    // Парсим полученный JSON
    const json: Tables[] = await res.json();
    // Обновляем state
    setTables(json); //
  };

  //поиск
  const [searchEmp, setSearchEmp] = useState("");
  const [searchConCl, setSearchConCl] = useState("");
  const [searchCity, setSearchCity] = useState("");

  const filteredContractsEmp = tables.filter((tables) => {
    if (searchEmp == "") {
      return tables.clientName.toLowerCase().includes(searchConCl.toLowerCase());
    } else {
      const a = tables.employeeName.toLowerCase().includes(searchEmp.toLowerCase());
      const b = tables.clientName.toLowerCase().includes(searchConCl.toLowerCase());
      return a && b;
    }
  });

  // Загружаем список клиентов на первое открытие страницы (для визуализации объекта)
  useEffect(() => {
    getTables();
  }, []);

  //здесь происходит красивое отображение моей таблицы
  return (
    <div className="app-tab" style={{ display: "flex", flexDirection: "column" }}>
      <div className="form">
        <form className="=search_form">
          <input
            type="text"
            placeholder="search employee..."
            className="search_input"
            onChange={(event) => setSearchEmp(event.target.value)}
          />
          <input
            type="text"
            placeholder="search client..."
            className="search_input"
            onChange={(event) => setSearchConCl(event.target.value)}
          />
          <input
            type="text"
            placeholder="search city..."
            className="search_input"
            onChange={(event) => setSearchCity(event.target.value)}
          />
        </form>
      </div>
      {/* Превращаем данные в DOM элементы, по div'у на Client'а*/}
      <div style={{ flex: "1", overflow: "auto" }}>
        <table className="list">
          <thead className="list-head">
            <tr className="list-row">
              {tablesPropertyList.map((field) => (
                <td className="list-item" key={field}>
                  {tablesFieldMetadata[field].label}
                </td>
              ))}
            </tr>
          </thead>
          <tbody className="list-body">
            {filteredContractsEmp.map((contractJoin) => (
              <tr key={contractJoin.id} className="list-row">
                {tablesPropertyList.map((field) => {
                  const { format } = tablesFieldMetadata[field];
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
