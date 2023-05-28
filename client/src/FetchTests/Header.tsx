import { Link, useLocation } from "react-router-dom";

const links: { text: string; to: string }[] = [
  { to: "/main", text: "Начало" },
  { to: "/clients", text: "Клиенты" },
  { to: "/contracts", text: "Договоры" },
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
