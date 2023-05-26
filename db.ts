import { Pool, QueryResultRow } from "pg"; //импорт постгреса
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

/**
 * Запуск SQL запроса
 *
 * @example
 * //вызов
 * query`один = ${123}, два${456}три`
 * //приведет к
 * template = ["один = ", ", два", "три"]
 * queryParams = [123, 456]
 * //после склеивания в template.map().join получится аналогично
 * pool.query("один = $1, два$2три", [123, 456])
 */
export async function query<T extends QueryResultRow>(template: TemplateStringsArray, ...queryParams: any[]) {
  const templateSize = template.length;

  const queryString = template
    .map((templateString, index) =>
      // склеиваем пары templateString и $i, кроме последней, которая возвращается как есть
      index < templateSize - 1 ? `${templateString}$${index + 1}` : templateString
    )
    .join("");

  return pool.query<T>(queryString, queryParams);
}
