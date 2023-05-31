//файл для запуска сервера

//импорт нужных мне фреймворков (или просто важных штук) ,
//дотенв для окр.пер.  экспресс для веб, патх - путь

import dotenv from "dotenv"; //неуверена что это мне нужно
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { pool, initDb, query } from "./db"; //импорт бд

import { JsonWebKey } from "crypto";

const jwt = require("jsonwebtoken"); //для токена

async function main() {
  console.log("Hello! Server starting uwu");
  // Вызываем инициализацию базы
  await initDb();

  const { json } = require("body-parser"); //боди-парсер чтобы достать боди из реквеста, когда идет пост-запрос
  const port = process.env.PORT || 8080;

  //config will read your .env file, parse the contents, assign it to process.env, and return an Object with a parsed key containing the loaded content or an error key if it failed.
  //то есть конфиг читает моий файл где пер.окружения, парс контент и еще что-то куча
  dotenv.config();

  //создать объект экспресс чтобы с ним работать (создаем объект приложения)
  const app: Express = express();

  //Встроенный посредник, разбирающий входящие запросы в объект в формате JSON. основан на body-parser.
  //переводит данные в формат жсон
  app.use(express.json());
  app.use(cors());
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World From the Typescript Server!");
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

  //токеныыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыы
  //создаем приваткей
  /*
  const usr = await query`SELECT name FROM users WHERE id='492029c0-547c-456e-9c7e-cdc629112518'`;
  const emael = await query`SELECT email FROM users WHERE id='492029c0-547c-456e-9c7e-cdc629112518'`;
  const privateKey = "private.key";

  //создаем токен

  app.get("/token", function (req, res) {
    const token = jwt.sign({ name: usr, email: emael }, "secret", { expiresIn: "2h" });
    //console.log(token);
    res.send(token);
  });

  // Register a route that requires a valid token to view data
  app.get("/api", function (req, res) {
    var token = req.query.token;
    jwt.verify(token, "secret", function (err) {
      if (!err) {
        //var secrets = {'accountNumber' : '938291239','pin' : '11289','account' : 'Finance'};
        console.log("нет ошибок вроде");
        res.json("work!");
      } else {
        res.send(err);
      }
    });
  });*/

  //ниже запросы к бд
  app.get("/client/:id", async (req, res) => {
    const id = req.params.id;
    const {
      rows: [client],
    } = await query`
      SELECT id "id"
        ,name "name"
        ,surname "surname"
        ,adress "adress"
        ,phoneNumber "phoneNumber"
        ,email "email"
        ,company "company"
      FROM clients
      WHERE id=${id}
    `;

    res.json(client); //в ответку передаем данные таблицы рядом, в формате жсон
  }); //достать всю таблицу клиентов

  app.get("/clients", async (req, res) => {
    const z1 = await pool.query(`
      SELECT id "id"
        ,name "name"
        ,surname "surname"
        ,adress "adress"
        ,phoneNumber "phoneNumber"
        ,email "email"
        ,company "company"
      FROM clients
      ORDER BY surname,name
    `);
    res.json(z1.rows); //в ответку передаем данные таблицы рядом, в формате жсон
  }); //достать всю таблицу клиентов

  //contracts
  app.get("/contracts", async (req, res) => {
    const z1 = await pool.query(`
      SELECT id "id"
        ,clientId "clientId"
        ,contractNumber "contractNumber"
        ,dateBegin "dateBegin"
        ,dateEnd "dateEnd"
        ,price "price"
      FROM contracts
    `);
    res.json(z1.rows);
  });

  app.post("/client", async (req, res) => {
    const { id, name, surname, adress, phoneNumber, email, company } = req.body;

    if (id) {
      const update = await query`
      UPDATE clients SET (name, surname, adress, phoneNumber, email, company) = 
      (${name}, ${surname}, ${adress}, ${phoneNumber}, ${email}, ${company})
      WHERE id=${id}`;
    } else {
      const newPerson = await query`
      INSERT INTO clients (name, surname, adress, phoneNumber, email, company)
        VALUES (${name}, ${surname}, ${adress}, ${phoneNumber}, ${email}, ${company})
      RETURNING *`;
      res.json(newPerson.rows);
    }
  });

  app.post("/client", async (req, res) => {
    const { id } = req.body;
    const newPerson = await query`
      SELECT clients (name, surname, adress, phoneNumber, email, company)
        WHERE id=(${id})
      RETURNING *`;
    res.json(newPerson.rows);
  });

  app.post("/client/delete/:id", async (req, res) => {
    const { id } = req.params;
    const zapros = await query`DELETE FROM clients where id = ${id}`;
    res.json(zapros.rows);
  });

  /*
  app.post("/user", async (req, res) => {
    const { login, password } = req.body;
    const newUser = await query`
      INSERT INTO users (login, password)
        VALUES (${login}, ${password})
      RETURNING *`;
    res.json(newUser.rows);
  });*/

  app.post("/user", async (req, res) => {
    const { login, password } = req.body;

    const usr = await query`
      SELECT login FROM users WHERE login = (${login})`;
    const pass = await query`
      SELECT password FROM users WHERE password = (${password})`;

    console.log(JSON.stringify(usr));
    console.log(JSON.stringify(pass));

    if (login == usr && password == pass) {
      res.json(usr.rows);
      console.log("got ya");
    } else {
      //console.log(usr + "" + pass);
      console.log("no match");
    }
  });
}

main();
