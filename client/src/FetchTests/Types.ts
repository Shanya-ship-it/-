//файл для типизации объектов? данных?
export interface Client {
  //определение типов
  id: number;
  name: string;
  surname: string;
  adress: string;
  phonenumber: string;
  email: string;
  company: string;
}

//теперь делаю тоже самое только для контрактов
export interface Contract {
  //определение типов
  id: number;
  //idCl: number; ??
  contract: number;
  datebegin: Date;
  dtend: number;
  price: number;
}

/** Свойства клиента для отрисовки */
export type ClientProperties = Omit<Client, "id">; //омит ("пропускать") - выбирает все свойства кроме того что мы написали внутри омита, в данном случае айди

export type ContractProperties = Omit<Contract, "id">;
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
  phonenumber: { label: "Phone Number", type: "string" },
};

export const contractFieldMetadata: Record<keyof ContractProperties, FieldMetadata> = {
  contract: { label: "Contract", type: "string" },
  datebegin: { label: "Data start", type: "date" },
  dtend: { label: "Data end", type: "number" },
  price: { label: "Price", type: "number" },
};

/** Список полей */
export const clientPropertyList: (keyof ClientProperties)[] = Object.keys(clientFieldMetadata) as any; //as any?
export const contractPropertyList: (keyof ContractProperties)[] = Object.keys(contractFieldMetadata) as any;
