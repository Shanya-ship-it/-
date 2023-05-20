"use strict";
//импорт нужных мне фреймворков (или просто важных штук) , 
//дотенв для окр.пер.  экспресс для веб, патх - путь
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//const dbcon = require('dbcontroller'); //импорт контроллера бд
const { json } = require('body-parser'); //чтобы был жсон
//const { Pool } = pg //подключение постгрес и переменная пула???? 
const port = process.env.PORT || 8080;
const Pool = require('pg').Pool;
const pool = require('./client/db');
//config will read your .env file, parse the contents, assign it to process.env, and return an Object with a parsed key containing the loaded content or an error key if it failed.
//то есть конфиг читает моий файл где пер.окружения, парс контент и еще что-то куча
dotenv_1.default.config();
//создать объект экспресс чтобы с ним работать (создаем объект приложения)
const app = (0, express_1.default)();
//Встроенный посредник, разбирающий входящие запросы в объект в формате JSON. основан на body-parser.
//переводит данные в формат жсон
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//запрос в постгресгл
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const z1 = yield pool.query(`SELECT * FROM users`);
        res.json(z1.rows);
    }
    catch (err) {
        console.error(err + ' ошибка');
    }
}));
app.get('/', (req, res) => {
    res.send('Hello World From the Typescript Server!');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
// Array of example users for testing purposes
const users = [
    {
        id: 1,
        name: 'Maria Doe',
        email: 'maria@example.com',
        password: 'maria123'
    },
    {
        id: 2,
        name: 'Juan Doe',
        email: 'juan@example.com',
        password: 'juan123'
    }
];
// route login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => {
        return user.email === email && user.password === password;
    });
    if (!user) {
        return res.status(404).send('User Not Found!');
    }
    return res.status(200).json(user);
});
