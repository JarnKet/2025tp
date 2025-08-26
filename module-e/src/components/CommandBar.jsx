import { useContext, useEffect, useState } from "react";

import { COMMANDS } from "../constants";
import { PhotoSliderContext } from "../features/photo-slider/Provider";

export default function CommandBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(-1);

  const { dispatch } = useContext(PhotoSliderContext);

  // handle keydown
  useEffect(() => {
    function handleKeydown(e) {
      // e.preventDefault();
      // Open command bar
      if ((e.ctrlKey && e.key === "k") || e.key === "/") {
        e.preventDefault();
        handleOpen();
      }

      if (!isOpen) return;

      // Close command bar
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }

      // Use arrow keys to select up-down command
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedCommandIndex((prev) => (prev + 1) % COMMANDS.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedCommandIndex((prev) =>
          prev <= 0 ? filteredCommand.length - 1 : prev - 1
        );
      }

      // Press "Enter" to execute command
      if (e.key === "Enter") {
        e.preventDefault();
        handleExecuteCommand();
      }
    }

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [isOpen, selectedCommandIndex]);

  function handleOpen() {
    document.body.style.overflow = "hidden";
    setIsOpen(true);
  }

  function handleClose() {
    document.body.style.overflow = "auto";
    setIsOpen(false);
    setSearchTerm("");
    setSelectedCommandIndex(-1);
  }

  // Set search term
  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  function handleExecuteCommand() {
    dispatch(COMMANDS[selectedCommandIndex].fn());
    handleClose();
  }

  // Filter commands base on search term
  const filteredCommand = COMMANDS.filter((command) =>
    command.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  return (
    <div
      className={`${isOpen ? "visible opacity-100" : "invisible opacity-0"} flex justify-between items-center fixed w-screen h-screen top-0 left-0 bg-[rgba(0,0,0,0.3)] transition-all duration-300`}
    >
      <div className="relative w-full h-full">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 max-w-[700px] w-11/12 mx-auto">
          <label htmlFor="search-command" className="sr-only">
            Search Command
          </label>
          <input
            id="search-command"
            type="text"
            placeholder="Search command.."
            className="w-full px-4 py-2 rounded-lg"
            value={searchTerm}
            onChange={handleChange}
          />
          <ul className="my-4 rounded-lg overflow-hidden [&_li]:border-b-0">
            {filteredCommand.map((command, index) => (
              <li key={command.name} className="w-full cs-shadow">
                <button
                  className={`${selectedCommandIndex === index ? "bg-zinc-300" : "bg-zinc-50"} text-start w-full font-bold px-8 py-4 hover:bg-zinc-300 transition-colors duration-300`}
                  onClick={handleExecuteCommand}
                  onMouseEnter={() => setSelectedCommandIndex(index)}
                >
                  {command.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
