import { useEffect, useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("THEME") || "system";
    }
    return "system";
  });

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("THEME", "dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
      localStorage.setItem("THEME", "light");
    } else {
      // system
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", isDark);
      localStorage.setItem("THEME", "system");
    }
  }, [theme]);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return { theme, toggleTheme };
}
