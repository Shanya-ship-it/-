import { Pool } from "pg"; //импорт постгреса
import * as config from "./db.config"; //импорт конфигурации бд
import * as fs from "fs/promises"; //Импорт промисов. API-интерфейсы промисов используют базовый пул потоков Node.js для выполнения операций файловой системы вне потока цикла событий.

/** Соединение с базой */
export const pool = new Pool(config);

/** Инициализация базы */
export async function initDb() {
  console.log("Starting db init");
  const initQuery = await fs.readFile("./sql/init.sql", "utf8");
  await pool.query(initQuery);
  console.log("Db init success! :)");
}

export async function query(template: TemplateStringsArray, ...args: any[]) {
  //что внутри функции?
  return pool.query(
    template.map((str, i) => (i < template.length - 1 ? `${str}$${i + 1}` : str)).join(""),
    args
  ); //что тут за значения????
} //функция возвращает результат выполненния запроса к бд в виде промиса
