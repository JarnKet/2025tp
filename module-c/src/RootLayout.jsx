import { Outlet } from "react-router";

// components
import Header from "./components/Header";
import Navigationbar from "./components/Navigationbar";
import useTheme from "./hooks/useTheme";
import { useEffect } from "react";

export default function RootLayout() {
  const { theme } = useTheme();

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
  return (
    <div className="mobile-container flex flex-col max-h-screen bg-zinc-100 dark:bg-zinc-300">
      <Header />
      <main
        id="main-content"
        className="h-screen overflow-y-auto py-8 scroll-smooth px-4"
      >
        <Outlet />
      </main>
      <Navigationbar />
    </div>
  );
}
