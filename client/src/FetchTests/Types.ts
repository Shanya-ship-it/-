// Файл для типизации данных
/** Клиент */
export interface Client {
  id: string;
  name: string;
  surname: string;
  adress: string;
  phoneNumber: string;
  email: string;
  company: string;
}

//теперь делаю тоже самое только для контрактов
export interface Contract {
  id: string;
  clientId: string;
  contractNumber: number;
  dateBegin: Date;
  dateEnd: number;
  price: number;
}

/** Свойства клиента для отрисовки */
export type ClientProperties = Omit<Client, "id">; //омит ("пропускать") - выбирает все свойства кроме того что мы написали внутри омита, в данном случае айди

export type ContractProperties = Omit<Contract, "id" | "clientId">;
/** Свойства для полей ввода */
interface FieldMetadata {
  label: string;
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  format?: (value: any) => string;
}

/** Словарь свойств полей ввода */
export const clientFieldMetadata: Record<keyof ClientProperties, FieldMetadata> = {
  name: { label: "Имя", type: "text" },
  surname: { label: "Фамилия", type: "text" },
  adress: { label: "Адрес", type: "text" },
  company: { label: "Компания", type: "text" },
  email: { label: "Email", type: "text" },
  phoneNumber: { label: "Номер телефона", type: "string" },
};

const dateFormat = (date: string) => new Date(date).toLocaleDateString("ru-RU");
const moneyFormat = (money: string) =>
  parseInt(money).toLocaleString("ru-RU", { style: "currency", currency: "rub" });

export const contractFieldMetadata: Record<keyof ContractProperties, FieldMetadata> = {
  contractNumber: { label: "Номер контракта", type: "string" },
  dateBegin: { label: "Дата начала", type: "date", format: dateFormat },
  dateEnd: { label: "Дата завершения", type: "date", format: dateFormat },
  price: {
    label: "Сумма",
    type: "number",
    format: moneyFormat,
  },
};

// тайпскрипт глупый, не догадывается, что список ключей это список ключей, поэтому тип надо затереть неправильный тип через as any
/** Список полей клиента */
export const clientPropertyList: (keyof ClientProperties)[] = Object.keys(clientFieldMetadata) as any;
/** Список полей контракта */
export const contractPropertyList: (keyof ContractProperties)[] = Object.keys(contractFieldMetadata) as any;
