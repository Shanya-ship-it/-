-- Запросы для инициализации базы

CREATE TABLE IF NOT EXISTS request (
	id_request UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
	first_name CHAR(300),
	last_name CHAR(300),
	second_name CHAR(300),
	phonenumber CHAR(15),
	email CHAR(100),
	status CHAR(100),
	comment CHAR(500)
	
);
CREATE TABLE IF NOT EXISTS client(
	id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
	requestID UUID REFERENCES request (id_request),
	first_name CHAR(300),
	last_name CHAR(300),
	second_name CHAR(300),
	phonenumber CHAR(15),
	email CHAR(100)

);
CREATE TABLE IF NOT EXISTS employee(
	id_employee UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
	first_name CHAR(300),
	last_name CHAR(300),
	second_name CHAR(300),
	phonenumber CHAR(15),
	email CHAR(100),
	login CHAR(300),
	password CHAR(300)
);

CREATE TABLE IF NOT EXISTS service(
	id_service UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
	name CHAR(300),
	description CHAR(500),
	cost NUMERIC
);
CREATE TABLE IF NOT EXISTS contract(
	id_contract UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
	employeeID UUID REFERENCES employee (id_employee),
	clientID UUID REFERENCES client (id_client),
	serviceID UUID REFERENCES service (id_service),
	singing_date DATE,
	completion_date DATE
);

/*
INSERT INTO request (first_name, last_name, second_name, phonenumber, email, status, comment) VALUES 

	('Ксения', 'Голованова', 'Михайловна', '12345678912345', 'ksenia@mail.ru','проверен', 'Капитальный ремонт'),
	('Олеся', 'Зуева', 'Степановна', '45678912345678', 'olesya@mail.ru', 'проверен', 'Строительство склада'),
	('Михаил', 'Захаров', 'Серафимович', '189562378455', 'misha@mail.ru','проверен', 'Стройка загородного дома'),
	('Ширяева', 'Мария', 'Данииловна', '1235467893692','maria@mail.ru', 'откленен', 'Аренда оборудования'),
	('Петров', 'Никита', 'Макарович', '1235467893692', 'nikita@mail.ru','не проверен', 'Шпаклевка стен');

INSERT INTO client (first_name, last_name, second_name, phonenumber, email) VALUES
	('Ксения', 'Голованова', 'Михайловна', '12345678912345', 'ksenia@mail.ru'),
	('Олеся', 'Зуева', 'Степановна', '45678912345678', 'olesya@mail.ru'),
	('Михаил', 'Захаров', 'Серафимович', '189562378455', 'misha@mail.ru');

INSERT INTO employee (first_name, last_name, second_name, phonenumber, email, login, password) VALUES
	('Даниил', 'Максимов', 'Максимович', '14725836914587', 'daniil@mail.ru', 'danmax', 'danmax123'),
	('Виктория', 'Иванова', 'Игоревна', '78945614725896', 'vika@mail.ru', 'vikaivn', 'vikaivn123'),
	('Ольга', 'Лунина', 'Александровна', '9818363032', 'shan.t4704@mail.ru', 'shant', 'shant123'),
	('Ева', 'Осипова', 'Витальевна', '1478523692', 'eva@mail.ru', 'evaosip', 'evaosip123');

INSERT INTO service (name, description, cost) VALUES 
	('Уплотноение песка виброплитой', 'Уплотноение песка виброплитой, ед.изм. м^2', 90),
	('Очистка стен от штукартурки', 'Очистка стен от штукатурки, ед.изм. м^2', 160),
	('Капитальный ремонт штукарутрного фасада', 'Капитальный ремонт штукарутрного фасада с частичной отбивкой штукатурки, ед.изм. м^2', 500),
	('Монтаж газонной решетки', 'Монтаж газонной решетки, ед.изм. м^2', 160),
	('Устройство покрытий из брусчатки', 'Устройство покрытий из брусчатки, ед.изм. м^2', 90),
	('Шпаклевка стен', 'Шпаклевка стен, ед.изм. м^2', 100),
	('Шпаклевка потолка', 'Шпаклевка потолка, ед.изм. м^2', 130),
	('Финишная шпаклевка стен под окраску', 'Финишная шпаклевка стен под окраску, ед.изм. м^2', 100),
	('Высококачественное оштукатуривание стен и перегородок', 'Высококачественное оштукатуривание стен и перегородок цементно-песчанной смесью при толщине словя до 25 мм, ед.изм. м^2', 450),
	('Строительнство холодного склада', 'Строительнство холоддного скалада, ед.изм. м^2', 90)
	ON CONFLICT (name) DO NOTHING;*/
--= ඞ =--