import React, { useState, useEffect } from "react";
import { Client, clientFieldMetadata, clientPropertyList } from "./Types";
import { ContractJoin, contractJoinFieldMetadata, contractJoinPropertyList } from "./Types";

export const Search = () => {
  const [clients, setClients] = useState<Client[]>([]);

  const getClients = async () => {
    // Делаем запрос до бэка, фетч для обращения к ресурсам по сети, фетч("источник", объект конфигурации)
    const res = await fetch("http://localhost:8080/clients", {
      //(урл, дополнительные настройки)
      method: "GET",
      headers: { "Content-type": "application/json" }, //тут где-то должен быть токен
    });
    // Парсим полученный JSON
    const json: Client[] = await res.json();
    // Обновляем список клиентов
    setClients(json); //?
  };

  const [searchCl, setSearchCl] = useState("");

  //поиск по имени клиента
  const searchWords = searchCl.toLowerCase().split(" "); //то что хочу искать
  const searchFields: (keyof Client)[] = ["firstname", "secondname", "lastname"]; //где хочу найти

  //массив clients вызывает функцию filter, которая принимает в себя некого клиента, сравниваем есть ли в массиве то что мы написали в инпуте
  const filteredClients = clients.filter((client) =>
    searchWords.every((word) => searchFields.some((field) => client[field].toLowerCase().includes(word)))
  );

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

  const [searchEmp, setSearchEmp] = useState("");
  const [searchConCl, setSearchConCl] = useState("");
  const [searchCon, setSearchCon] = useState("");

  //поиск по имени сотрудника
  const filteredContractsEmp = contractsJoin.filter((contractsj) => {
    return contractsj.employeeName.toLowerCase().includes(searchEmp.toLowerCase());
  });

  //поиск клиента в контракте
  const filteredContractsCl = contractsJoin.filter((contractsj) => {
    return contractsj.clientName.toLowerCase().includes(searchConCl.toLowerCase());
  });

  useEffect(() => {
    getClients();
    getContractJoin();
  }, []);

  return (
    <div>
      <div className="form">
        <form className="=search_form">
          <input
            type="text"
            placeholder="search in the clients..."
            className="search_input"
            onChange={(event) => setSearchCl(event.target.value)}
          />
          <input
            type="text"
            placeholder="search in the contracts employee..."
            className="search_input"
            onChange={(event) => setSearchEmp(event.target.value)}
          />
          <input
            type="text"
            placeholder="search in the contracts client..."
            className="search_input"
            onChange={(event) => setSearchConCl(event.target.value)}
          />
        </form>
      </div>
      <div style={{ flex: "1", overflow: "auto" }}>
        <table className="list">
          <thead className="list-head">
            <tr className="list-row">
              {clientPropertyList.map((field) => (
                <td className="list-item" key={field}>
                  {clientFieldMetadata[field].label}
                </td>
              ))}
            </tr>
          </thead>
          <tbody className="list-body">
            {filteredContractsEmp.map((contractJoin) => (
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
