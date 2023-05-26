-- Запросы для инициализации базы

CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  name CHAR(300),
  surname CHAR(300),
  adress CHAR(300),
  phonenumber CHAR(15),
  email CHAR(300),
  company CHAR(300),
  contract INTEGER
);

INSERT INTO clients (id, name, surname, adress, phonenumber, email, company, contract)
VALUES
  ('0d067d44-fe99-450f-9044-2a7cb915f78c', 'София',    'Матвеева', 'ул. Андрюшкина 23',  '123456789', 'sofia@mail.ru',  'sofiaCO',  001),
  ('05a7fae3-26c5-4bf9-81f3-5885b330ba3c', 'Виктория', 'Пирогова', 'ул. Пушника 36',     '23567891',  'vika@mail.ru',   'vikaCO',   002),
  ('68d8b2f6-b7ee-4899-b399-5c3f414a98b7', 'Кирилл',   'Иванов',   'ул. Победы 78',      '345678912', 'kirill@mail.ru', 'kirillCO', 003),
  ('3568ef37-1d9a-4cb2-abee-7d92e32451e4', 'Вероника', 'Сорокина', 'ул. Грибоедова 253', '456789123', 'veron@mail.ru',  'veronCO',  004),
  ('ce5636f3-c29e-4ad7-999c-068ec2fc923f', 'Ярослав',  'Шишкин',   'ул. Восстания 2',    '567891234', 'yarod@mail.ru',  'sofiaCO',  005)
ON CONFLICT (id) DO NOTHING;



CREATE TABLE IF NOT EXISTS contracts 
(
	id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
	contract INTEGER,
	clientName CHAR(100),
	company CHAR(100)
);
INSERT INTO contracts (id, contract, clientName, company) VALUES 
('e96daf39-be5a-453d-ba46-310cce1d9303', 1, 'София	Матвеева', 'sofiaCO' ),
('4de09c55-b928-4b11-aedb-16ee06816467', 2, 'Виктория	Пирогова', 'vikaCO' ),
('c7b2c825-3b85-4b58-a6ba-6d11c0b1b33d', 3, 'Кирилл	Иванов', 'kirillCO' )
ON CONFLICT (id) DO NOTHING;
--= ඞ =--