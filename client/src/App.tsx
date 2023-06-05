//начальная страница , которая открывается при запуске сервера.
//тут кноочки и рисование страницы
import { Route, Routes, BrowserRouter, Navigate, useNavigate, useLocation } from "react-router-dom"; //импорт роутов

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
import { RegUser } from "./FetchTests/RegUsr";

import React, { useContext } from "react";
import { RequestList } from "./FetchTests/Request";
import { ContractJoinList } from "./FetchTests/ContractJoin";

interface AuthProviderProps {
  children?: React.ReactNode;
}

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

interface AuthContextValue {
  token: string | null;
  onLogin: () => Promise<void>;
  onLogout: () => Promise<void>;
}

const defaultValue: AuthContextValue = {
  token: "",
  onLogin: async () => console.log("Default onLogin"),
  onLogout: async () => console.log("Default onLogout"),
};

export const AuthContext = React.createContext<AuthContextValue>(defaultValue);

//fakeAuth для имитации токена для авторизации + задержка для имитации
const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const fakeAuth = async (): Promise<string> => {
  await sleep(250);
  return "thisisfuckingtoken";
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};

//аут.контекст нужен чтобы другие компоненты имели знали про токен
//АутхПровидер - вся логика аутентификации теперь в этом объекте или почти вся
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = React.useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    const token = await fakeAuth();
    setToken(token);

    const origin = location.state?.from?.pathname || "/main";
    navigate(origin);

    navigate("/test2");
    console.log("handleLogin");
    console.log(token);
  };

  const handleLogout = async () => {
    console.log(token);
    console.log("handleLogout");
    setToken(null);
  };

  const value: AuthContextValue = {
    token: token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/main" replace state={{ from: location }} />;
  }

  return <> {children}</>;
};
//
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
            <Route path="/contractsj" element={<ContractJoinList />} />
            <Route path="/client/edit/:id?" element={<EditClient />} />
            <Route path="/requests" element={<RequestList />} />
            <Route path="/test" element={<TestAuth />} />
            <Route
              path="/test2"
              element={
                <ProtectedRoute>
                  <TestAuth2 />
                </ProtectedRoute>
              }
            />
            <Route path="/user" element={<RegUser />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
