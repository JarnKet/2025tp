const LINKS = [
  {
    name: "Link",
    url: "/",
  },
  {
    name: "Link",
    url: "/",
  },
  {
    name: "Link",
    url: "/",
  },
];

export default function Naivgation() {
  return (
    <nav className="cs-container py-4 flex items-center justify-between">
      <a
        href="/"
        aria-label="Go to home page"
        className="text-gray-500 uppercase text-4xl font-bold"
      >
        welcome lyon
      </a>

      {/* Links */}
      <ul className="flex items-center gap-6">
        {LINKS.map((link, index) => (
          <li key={link + index}>
            <a href={link.url} className="text-gray-500 font-semibold">
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
