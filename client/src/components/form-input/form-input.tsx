//этот файл будет содержать наши многократно используемые входные данные формы.
//

//Интерфес пропсов наследуется от React.InputHTMLAttributes<HTMLInputElement>. Все пропсы кроме перечисленных, className и style передаются в <input>
//Props представляет коллекцию значений, которые ассоциированы с компонентом.
//Этот файл с 
//лдя работы с нтмл элементами похоже

//FunctionComponent (или React.FC для краткости), которые можно использовать для типизации функциональных компонентов React.
//Компоненты, созданные как функции, называются функциональными. Они принимают объект со свойствами как первый аргумент, и также начинаются с большой буквы. 

 import { InputHTMLAttributes, FC } from "react"; 

  import './form-input.css'; //импорт файла с css для красоты

  type FromInputProps = { label: string } &         //
    InputHTMLAttributes<HTMLInputElement>;        //переменная которая ???? -для работы с нтмл элементами

  const FormInput: FC<FromInputProps> = ({ label, ...otherProps }) => {
    return (
      <div className="group">
        <input {...otherProps} />
        {
          label &&
          <div className="form-input-label">
            {label}
          </div>
        }
      </div>
    );
  }

  export default FormInput;