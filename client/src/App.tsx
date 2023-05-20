//начальная страница , которая открывается при запуске сервера.


//импорт всякой херни для выведения на экран красивой страницы

import { useState, ChangeEvent, FormEvent } from "react";  //похоже на импорт обработчиков событий 
import { ReactComponent as Logo } from "./logo.svg";    //импорт лого
import { getData } from "./utils/data-util";   //импорт обработки данных
import FormInput from './components/form-input/form-input';  //импорт компонентов, которая форма-инпут

import './App.css';                   //импорт цсс для красоты   

// TypeScript declarations
type User = {                        //?
  id: number,
  name: string,
  email: string,
  password: string
}

const defaultFormFields = {
  email: '',
  password: '',
}

const App = () => {
  // react hooks                                  //Хуки — механизм в React, который позволяет работать полностью без классов. 
  const [user, setUser] = useState<User | null>()     //useState - хук, формФилд - переменная, сетФормФилд - метод. Единственный аргумент useState — это начальное состояние. 
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  const resetFormFields = () => {
    return (
      setFormFields(defaultFormFields)
    );
  }

  // handle input changes
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormFields({...formFields, [name]: value })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      // make the API call
      const res:User = await getData(
        'http://localhost:8080/login', email, password
      )
      setUser(res);
      resetFormFields()
    } catch (error) {
      alert('User Sign In Failed');
    }
  };

  const reload = () => {
    setUser(null);
    resetFormFields()
  };

  //тут похоже опять хмтл для внешнего вида страницы

  return (
    <div className='App-header'>
      <h1>
        { user && `Welcome! ${user.name}`}
      </h1>
      <div className="card">
        <Logo className="logo" />
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            type="email"
            required
            name="email"
            value={email}
            onChange={handleChange}
          />
          <FormInput
            label="Password"
            type='password'
            required
            name='password'
            value={password}
            onChange={handleChange}
          />
          <div className="button-group">
            <button type="submit">Sign In</button>
            <span>
              <button type="button" onClick={reload}>Clear</button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;

