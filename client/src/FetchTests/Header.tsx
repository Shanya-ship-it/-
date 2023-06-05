import { Link, useLocation } from "react-router-dom";

const links: { text: string; to: string }[] = [
  { to: "/main", text: "Главная" },
  { to: "/clients", text: "Клиенты" },
  { to: "/contractsj", text: "Контракты" },
  { to: "/requests", text: "Заявки" },
];

export const Header = () => {
  const location = useLocation();
  return (
    <>
      <h2 className="cool-header">Автоматизированная система учета клиентов строительной компании</h2>
      <div className="app-links">
        {links.map((link) => (
          <Link to={link.to} className={location.pathname.startsWith(link.to) ? "active" : ""}>
            {link.text}
          </Link>
        ))}
      </div>
    </>
  );
};
