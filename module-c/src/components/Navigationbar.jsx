import { NavLink } from "react-router-dom";

const LINKS = [
  {
    name: "carparks",
    path: "/carparks",
  },
  {
    name: "events",
    path: "/events",
  },
  {
    name: "weather",
    path: "/weather",
  },
  {
    name: "travel planner",
    path: "/travel-planner",
  },
  {
    name: "setting",
    path: "/setting",
  },
];

export default function Navigationbar() {
  return (
    <nav className="w-full bg-[#333]">
      <div className="py-2 mobile-container ms:cs-container">
        <ul className="flex flex-wrap items-start justify-center gap-8">
          {LINKS.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `${isActive ? "text-white bg-sky-500" : "text-white hover:bg-zinc-400 hover:text-[#333]"} inline-block px-3 py-3 rounded-lg font-bold text-lg capitalize transition-colors duration-300`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
