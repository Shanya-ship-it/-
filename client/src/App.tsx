//начальная страница , которая открывается при запуске сервера.
//тут кноочки и рисование страницы
import { Route, Routes, BrowserRouter } from "react-router-dom"; //импорт роутов

import "./App.css"; //импорт цсс для красоты
import { ClientList } from "./FetchTests/ClientList"; //импорт файла с логикой выполнения запроса для таблицы с клиентами
import { AddClient } from "./FetchTests/AddClient"; //
import { ContractList } from "./FetchTests/Contract";
import { Welcome } from "./FetchTests/Welcome";
import { Header } from "./FetchTests/Header";
import { EditClient } from "./FetchTests/EditClients";

//импортировали страницу чтобы создать роут на нее.
import { TestAuth } from "./FetchTests/TestAuth";
import { TestAuth2 } from "./FetchTests/TestAuth2";
import React, { useContext } from "react";

interface AuthProviderProps {
  children?: React.ReactNode;
}

interface AuthContextValue {
  token: string | null;
  onLogin: () => Promise<void>;
  onLogout: () => Promise<void>;
}

const defaultValue: AuthContextValue = {
  token: null,
  onLogin: async () => console.log("Default onLogin"),
  onLogout: async () => console.log("Default onLogout"),
};

export const AuthContext = React.createContext<AuthContextValue>(defaultValue);

//fakeAuth для имитации токена для авторизации + задержка для имитации
const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const fakeAuth = async (): Promise<string> => {
  await sleep(250);
  return "abababawawawa";
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};

//аут.контекст нужен чтобы другие компоненты имели знали про токен
//АутхПровидер - вся логика аутентификации теперь в этом объекте или почти вся
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = React.useState<string | null>(null);

  const handleLogin = async () => {
    const token = await fakeAuth();
    setToken(token);
    console.log("handleLogin");
    console.log(token);
  };

  const handleLogout = async () => {
    console.log(token);
    console.log("handleLogout");
    setToken(null);
  };

  const value: AuthContextValue = {
    token: "",
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

//link - привязка урл и пас и описание
//route path - путь урл, элемент - привязка объекта к урл
const App = () => {
  return (
    <div className="app-main">
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/main" element={<Welcome />} />
            <Route path="/clients" element={<ClientList />} />
            <Route path="/client/add" element={<AddClient />} />
            <Route path="/contracts" element={<ContractList />} />
            <Route path="/client/edit/:id?" element={<EditClient />} />
            <Route path="/test" element={<TestAuth />} />
            <Route path="/test2" element={<TestAuth2 />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
