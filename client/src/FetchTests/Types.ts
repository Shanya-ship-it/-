export interface Client {
  //определение типов
  id: number;
  name: string;
  surname: string;
  adress: string;
  phonenumber: string;
  email: string;
  company: string;
  contract: number;
}

/** Свойства клиента для отрисовки */
export type ClientProperties = Omit<Client, "id">;

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
  contract: { label: "Contract", type: "number" },
  email: { label: "Email", type: "text" },
  phonenumber: { label: "Phone Number", type: "string" },
};

/** Список полей */
export const clientPropertyList: (keyof ClientProperties)[] = Object.keys(clientFieldMetadata) as any;
