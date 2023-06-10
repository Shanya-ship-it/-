//файл для запуска сервера

//импорт нужных мне фреймворков,
//dotenv для окр.пер. экспресс для веб, path - путь

import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { pool, initDb, query } from "./db"; //импорт бд

async function main() {
  console.log("Hello! Server starting uwu");
  // Вызываем инициализацию базы
  await initDb();

  const { json } = require("body-parser"); //боди-парсер чтобы достать боди из реквеста, когда идет пост-запрос
  const port = process.env.PORT || 8080;

  //config will read your .env file, parse the contents, assign it to process.env, and return an Object with a parsed key containing the loaded content or an error key if it failed.
  //то есть конфиг читает моий файл где пер.окружения, парс контент и еще что-то куча
  dotenv.config();

  //создать объект экспресс (приложения) чтобы с ним работать
  const app: Express = express();

  //Встроенный посредник, разбирающий входящие запросы в объект в формате JSON. основан на body-parser.
  //переводит данные в формат жсон
  app.use(express.json());
  app.use(cors());
  //старт сервера
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World From the Typescript Server!");
  });
  //прослушка порта
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

  /** Запросы к бд */
  //Достать одного клиента по id
  app.get("/client/:id", async (req, res) => {
    const id = req.params.id;
    const {
      rows: [client],
    } = await query`
      SELECT id "id"
        ,first_name "firstname"
        ,last_name "lastname"
        ,second_name "secondname"
        ,phoneNumber "phoneNumber"
        ,email "email"
      FROM client
      WHERE id=${id}`;
    res.json(client); //в ответку передаем данные таблицы рядом, в формате жсон
  });

  //достать всю таблицу клиентов
  app.get("/clients", async (req, res) => {
    const z1 = await pool.query(
      `SELECT id "id"
      ,first_name "firstname"
      ,last_name "lastname"
      ,second_name "secondname"
      ,phoneNumber "phoneNumber"
      ,email "email"
        FROM client
        ORDER BY last_name,first_name`
    );
    res.json(z1.rows);
  });

  //запрос если есть id - редактируем клиента, если нет id - добавляем нового клиента
  app.post("/client", async (req, res) => {
    const { id, firstname, lastname, secondname, phoneNumber, email } = req.body;

    if (id) {
      const update = await query`
      UPDATE client SET (first_name, last_name, second_name, phoneNumber, email) = 
      (${firstname}, ${lastname}, ${secondname}, ${phoneNumber}, ${email})
      WHERE id=${id}`;
    } else {
      const {
        rows: [newPerson],
      } = await query`
      INSERT INTO client (first_name, last_name, second_name, phoneNumber, email)
        VALUES (${firstname}, ${lastname}, ${secondname}, ${phoneNumber}, ${email})
      RETURNING *`;
      await query`INSERT INTO contract (employeeID, clientID, serviceID, singing_date, completion_date, price) 
      VALUES ('22efd401-ea5a-45f8-892b-5e019556ec60', ${newPerson.id}, '03cd9074-3f19-43dd-9756-50821f9d6da4', '2000-01-01', '2000-01-01', '00')`;

      res.json(newPerson);
    }
  });

  //удалить клиента по id
  app.post("/client/delete/:id", async (req, res) => {
    const { id } = req.params;
    const zapros = await query`DELETE FROM client where id = ${id}`;
    res.json(zapros.rows);
  });

  //Достать один контракт по id
  app.get("/contractj/:id", async (req, res) => {
    const id = req.params.id;
    const {
      rows: [constactj],
    } = await query`
      SELECT id_contract "id"
      ,(employee.first_name || ' ' || employee.last_name || ' ' || employee.second_name) "employeeName"
      ,(client.first_name || ' ' || client.last_name || ' ' || client.second_name) "clientName"
      ,service.name "serviceName"
      ,price "price"
      FROM contract
      JOIN employee ON employee.id_employee = contract.employeeID
      JOIN client ON client.id = contract.clientID
      JOIN service ON service.id_service = contract.serviceID
      WHERE id_contract=${id};
    `;
    res.json(constactj);
  });

  //достать всю таблицу контрактов
  app.get("/contractsj", async (req, res) => {
    const z1 = await pool.query(`
      SELECT id_contract "id"
        ,(employee.first_name || ' ' || employee.last_name || ' ' || employee.second_name) "employeeName"
        ,(client.first_name || ' ' || client.last_name || ' ' || client.second_name) "clientName"
        ,service.name "serviceName"
        ,singing_date "dateBegin"
        ,completion_date "dateEnd"
        ,price "price"
        FROM contract
        JOIN employee ON employee.id_employee = contract.employeeID
        JOIN client ON client.id = contract.clientID
        JOIN service ON service.id_service = contract.serviceID;
    `);
    res.json(z1.rows);
  });

  //запрос редактирования контракта только по имени
  app.post("/constactj", async (req, res) => {
    const { id, employeeName, clientName, serviceName, price } = req.body;
    const update = await query`
      UPDATE contract SET (employeeID, clientID, serviceID, price) = 
      ((SELECT employee.id_employee FROM employee WHERE employee.first_name=${employeeName}),(SELECT client.id FROM client WHERE client.first_name=${clientName}),(SELECT service.id_service FROM service WHERE service.name=${serviceName}),${price})
      WHERE id_contract=${id}`;
  });

  //добавить новый контракт
  app.post("/contractj", async (req, res) => {
    const { id, employeeName, clientName, serviceName, price } = req.body;
    if (id) {
      const updateContract = await query`
      UPDATE contract SET (employeeID, clientID, serviceID, price) = 
      ((SELECT employee.id_employee FROM employee WHERE employee.first_name=${employeeName}),(SELECT client.id FROM client WHERE client.first_name=${clientName}),(SELECT service.id_service FROM service WHERE service.name=${serviceName}),${price})
      WHERE id_contract=${id}`;
    } else {
      const newPerson = await query`
      INSERT INTO contract (employeeID, clientID, serviceID, price)
        VALUES 
        ((SELECT employee.id_employee FROM employee WHERE employee.first_name=${employeeName}),(SELECT client.id FROM client WHERE client.first_name=${clientName}),(SELECT service.id_service FROM service WHERE service.name=${serviceName}),${price})
      RETURNING *`;
      res.json(newPerson.rows);
    }
  });

  // удалить контракт по id
  app.post("/contractj/delete/:id", async (req, res) => {
    const { id } = req.params;
    const zapros = await query`DELETE FROM contract where id_contract = ${id}`;
    res.json(zapros.rows);
  });

  //достать всю таблицу заявок
  app.get("/requests", async (req, res) => {
    const z2 = await pool.query(`
      SELECT id_request "id"
      ,first_name "firstname"
      ,last_name "lastname"
      ,second_name "secondname"
      ,phoneNumber "phoneNumber"
      ,email "email"
      ,status "status"
      ,comment "comment"
        FROM request
      `);
    res.json(z2.rows);
  });

  //удалить заявку по id
  app.post("/request/delete/:id", async (req, res) => {
    const { id } = req.params;
    const zapros = await query`DELETE FROM request where id_request = ${id}`;
    res.json(zapros.rows);
  });
}

main();
