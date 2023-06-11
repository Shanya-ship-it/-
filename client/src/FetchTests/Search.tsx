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

  //поиск по имени сотрудника
  const filteredContractsEmp = contractsJoin.filter((contractsj) => {
    if (searchEmp == "") {
      return contractsj.clientName.toLowerCase().includes(searchConCl.toLowerCase());
    } else {
      return contractsj.employeeName.toLowerCase().includes(searchEmp.toLowerCase());
    }
  });

  //поиск клиента в контракте
  const filteredContractsCl = contractsJoin.filter((contractsj) => {
    return contractsj.clientName.toLowerCase().includes(searchConCl.toLowerCase());
  });

  useEffect(() => {
    getContractJoin();
  }, []);

  return (
    <div>
      <div className="app-tab" style={{ whiteSpace: "pre-wrap" }}>
        {`Поиск`}
      </div>
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
        </form>
      </div>
    </div>
  );
};
