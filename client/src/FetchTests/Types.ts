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
  contract: number;
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
}

/** Словарь свойств полей ввода */
export const clientFieldMetadata: Record<keyof ClientProperties, FieldMetadata> = {
  name: { label: "Name", type: "text" },
  surname: { label: "Surname", type: "text" },
  adress: { label: "Adress", type: "text" },
  company: { label: "Company", type: "text" },
  email: { label: "Email", type: "text" },
  phoneNumber: { label: "Phone Number", type: "string" },
};

export const contractFieldMetadata: Record<keyof ContractProperties, FieldMetadata> = {
  contract: { label: "Contract", type: "string" },
  dateBegin: { label: "Data start", type: "date" },
  dateEnd: { label: "Data end", type: "date" },
  price: { label: "Price", type: "number" },
};

// тайпскрипт глупый, не догадывается, что список ключей это список ключей, поэтому тип надо затереть неправильный тип через as any
/** Список полей клиента */
export const clientPropertyList: (keyof ClientProperties)[] = Object.keys(clientFieldMetadata) as any;
/** Список полей контракта */
export const contractPropertyList: (keyof ContractProperties)[] = Object.keys(contractFieldMetadata) as any;
