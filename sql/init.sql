-- Запросы для инициализации базы

CREATE TABLE IF NOT EXISTS clients (
  id SERIAL PRIMARY KEY,
  name CHAR(300),
  surname CHAR(300),
  adress CHAR(300),
  phonenumber INTEGER,
  email CHAR(300),
  company CHAR(300),
  contract INTEGER
);

INSERT INTO clients (name, surname, adress, phonenumber, email, company, contract)
VALUES
('София', 'Матвеева', 'ул. Андрюшкина 23', 123456789,'sofia@mail.ru','sofiaCO', 001),
('Виктория', 'Пирогова', 'ул. Пушника 36', 23567891,'vika@mail.ru','vikaCO', 002),
('Кирилл', 'Иванов', 'ул. Победы 78', 345678912,'kirill@mail.ru','kirillCO', 003),
('Вероника', 'Сорокина', 'ул. Грибоедова 253', 456789123,'veron@mail.ru','veronCO', 004),
('Ярослав', 'Шишкин', 'ул. Восстания 2', 567891234,'yarod@mail.ru','sofiaCO', 005)