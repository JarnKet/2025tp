import { useState } from "react";
import { getSortingMethod, setSortingMethod } from "../helper/utilities";
import useTheme from "../hooks/useTheme";

export default function Setting() {
  return (
    <section id="setting" className="space-y-3">
      <Theme />
      <SortingMethod />
    </section>
  );
}

export function Theme() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center justify-between w-full px-4 py-2 border-4 border-solid border-[#333] rounded-lg bg-white">
      <span className="font-medium text-lg">Theme Mode</span>
      <div>
        <label htmlFor="theme-select" className="sr-only">
          Theme Mode
        </label>
        <select
          id="theme-select"
          className="px-2 py-2 border-2 border-solid border-[#333] rounded-lg focus:cs-shadow"
          value={theme}
          onChange={(e) => toggleTheme(e.target.value)}
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </div>
  );
}

function SortingMethod() {
  const [currentmthod, setCurrentMethod] = useState(
    getSortingMethod() || "alphabet"
  );

  function handleChange(newMethod) {
    setCurrentMethod(newMethod);
    setSortingMethod(newMethod);
  }

  return (
    <div className="flex items-center justify-between w-full px-4 py-2 border-4 border-solid border-[#333] rounded-lg bg-white">
      <span className="font-medium text-lg">Sorting method</span>
      <div>
        <label htmlFor="sorting-method" className="sr-only">
          Sorting method
        </label>
        <select
          name="sorting-method"
          id="sorting-method"
          className="px-2 py-2 border-2 border-solid border-[#333] rounded-lg focus:cs-shadow"
          value={currentmthod}
          onChange={(e) => handleChange(e.target.value)}
        >
          <option value="alphabet">Alphabet</option>
          <option value="distance">Distance</option>
        </select>
      </div>
    </div>
  );
}
