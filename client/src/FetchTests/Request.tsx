import { useEffect, useState } from "react"; //хуки
import { Request, requestFieldMetadata, requestPropertyList } from "./Types";
import { Link } from "react-router-dom";

export const RequestList = () => {
  const [requests, setRequests] = useState<Request[]>([]);

  const getRequest = async () => {
    // Делаем запрос до бэка, фетч для обращения к ресурсам по сети, фетч("источник", объект конфигурации)
    const res = await fetch("http://localhost:8080/requests", {
      //(урл, дополнительные настройки)
      method: "GET",
      headers: { "Content-type": "application/json" }, //тут где-то должен быть токен
    });
    // Парсим полученный JSON
    const json: Request[] = await res.json();
    // Обновляем список клиентов
    setRequests(json); //?
  };

  useEffect(() => {
    getRequest();
  }, []);
  return (
    <div className="app-tab" style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <button onClick={getRequest}>Обновить список клиентов</button>
      </div>
      {/* Превращаем данные в DOM элементы, по div'у на Client'а*/}
      <div style={{ flex: "1", overflow: "auto" }}>
        <table className="list">
          <thead className="list-head">
            <tr className="list-row">
              {requestPropertyList.map((field) => (
                <td className="list-item" key={field}>
                  {requestFieldMetadata[field].label}
                </td>
              ))}
            </tr>
          </thead>
          <tbody className="list-body">
            {requests.map((request) => (
              <tr key={request.id} className="list-row">
                {requestPropertyList.map((field) => (
                  <td className="list-item" key={field}>
                    {request[field]}
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
