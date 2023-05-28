import { Link, useLocation } from "react-router-dom";

const links: { text: string; to: string }[] = [
  { to: "/", text: "Начало" },
  { to: "/clients", text: "Клиенты" },
  { to: "/contracts", text: "Договоры" },
];

export const Header = () => {
  const location = useLocation();
  return (
    <div>
      <h2 className="cool-header">Автоматизированная система учета клиентов строительной компании</h2>
      <div className="app-links">
        {links.map((link) => (
          <Link to={link.to} className={link.to === location.pathname ? "active" : ""}>
            {link.text}
          </Link>
        ))}
      </div>
    </div>
  );
};
