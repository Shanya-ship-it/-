// Файл для типизации данных
/** Клиент */

export interface Request {
  id: string;
  fullname: string;
  phoneNumber: string;
  status: string;
  comment: string;
}

export interface Client {
  id: string;
  id_req: string;
  firstname: string;
  lastname: string;
  secondname: string;
  phoneNumber: string;
  email: string;
}

export interface Employee {
  id: string;
  firstname: string;
  lastname: string;
  secondname: string;
  phoneNumber: string;
  email: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  cost: number;
}

//теперь делаю тоже самое только для контрактов
export interface Contract {
  id: string;
  employeeId: string;
  clientId: string;
  serviceId: string;
  dateBegin: Date;
  dateEnd: Date;
  price: number;
}

export interface ContractJoin {
  id: string;
  employeeName: string;
  clientName: string;
  serviceName: string;
  price: number;
}

export interface User {
  id: string;
  login: string;
  password: string;
}

/** Свойства клиента для отрисовки */

export type RequestProperties = Omit<Request, "id">;
export type ClientProperties = Omit<Client, "id" | "id_req">; //омит ("пропускать") - выбирает все свойства кроме того что мы написали внутри омита, в данном случае айди
export type EmployeeProperties = Omit<Employee, "id">;
export type ServiceProperties = Omit<Service, "id">;
export type ContractProperties = Omit<Contract, "id" | "employeeId" | "clientId" | "serviceId">;

export type ContractJoinProperties = Omit<ContractJoin, "id">; //contract join

export type UserProperties = Omit<User, "id">;

/** Свойства для полей ввода */
interface FieldMetadata {
  label: string;
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  format?: (value: any) => string;
}

const dateFormat = (date: string) => new Date(date).toLocaleDateString("ru-RU");
const moneyFormat = (money: string) =>
  parseInt(money).toLocaleString("ru-RU", { style: "currency", currency: "rub" });

/** Словарь свойств полей ввода */
export const requestFieldMetadata: Record<keyof RequestProperties, FieldMetadata> = {
  fullname: { label: "Полное Имя", type: "text" },
  phoneNumber: { label: "Номер телефона", type: "string" },
  status: { label: "Статус", type: "text" },
  comment: { label: "Комментарий", type: "text" },
};

export const clientFieldMetadata: Record<keyof ClientProperties, FieldMetadata> = {
  firstname: { label: "Имя", type: "text" },
  lastname: { label: "Фамилия", type: "text" },
  secondname: { label: "Отчество", type: "text" },
  phoneNumber: { label: "Номер телефона", type: "string" },
  email: { label: "Email", type: "text" },
};

export const employeeFieldMetadata: Record<keyof EmployeeProperties, FieldMetadata> = {
  firstname: { label: "Имя", type: "text" },
  lastname: { label: "Фамилия", type: "text" },
  secondname: { label: "Отчество", type: "text" },
  phoneNumber: { label: "Номер телефона", type: "string" },
  email: { label: "Email", type: "text" },
};

export const serviceFieldMetadata: Record<keyof ServiceProperties, FieldMetadata> = {
  name: { label: "Название", type: "text" },
  description: { label: "Описание", type: "text" },
  cost: {
    label: "Сумма",
    type: "number",
    format: moneyFormat,
  },
};

export const contractFieldMetadata: Record<keyof ContractProperties, FieldMetadata> = {
  dateBegin: { label: "Дата начала", type: "date", format: dateFormat },
  dateEnd: { label: "Дата завершения", type: "date", format: dateFormat },
  price: {
    label: "Сумма",
    type: "number",
    format: moneyFormat,
  },
};

export const contractJoinFieldMetadata: Record<keyof ContractJoinProperties, FieldMetadata> = {
  employeeName: { label: "Сотрудник", type: "text" },
  clientName: { label: "Клиент", type: "text" },
  serviceName: { label: "Услуга", type: "text" },
  price: {
    label: "Сумма",
    type: "number",
    format: moneyFormat,
  },
};

export const userFieldMetadata: Record<keyof UserProperties, FieldMetadata> = {
  login: { label: "Login", type: "text" },
  password: { label: "Password", type: "text" },
};

// тайпскрипт глупый, не догадывается, что список ключей это список ключей, поэтому тип надо затереть неправильный тип через as any
/** Список полей клиента */
export const requestPropertyList: (keyof RequestProperties)[] = Object.keys(requestFieldMetadata) as any;
export const clientPropertyList: (keyof ClientProperties)[] = Object.keys(clientFieldMetadata) as any;
export const employeePropertyList: (keyof EmployeeProperties)[] = Object.keys(employeeFieldMetadata) as any;
export const servicePropertyList: (keyof ServiceProperties)[] = Object.keys(serviceFieldMetadata) as any;
export const contractPropertyList: (keyof ContractProperties)[] = Object.keys(contractFieldMetadata) as any;

export const contractJoinPropertyList: (keyof ContractJoinProperties)[] = Object.keys(
  contractJoinFieldMetadata
) as any;

export const userPropertyList: (keyof UserProperties)[] = Object.keys(userFieldMetadata) as any;
