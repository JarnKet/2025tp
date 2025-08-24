import { useEffect, useState } from "react";
import { commands } from "../constant";
import usePhotoSlideContext from "../hook/usePhotoSlideContext";

export default function Commandbar() {
  const { dispatch } = usePhotoSlideContext();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCommandIndex, setSelectedCommand] = useState(-1);

  const filteredCommands = commands.filter((command) =>
    command.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [filteredCommands, selectedCommandIndex]);

  function handleKeydown(e) {
    const key = e.key;

    if (key === "ArrowDown") {
      setSelectedCommand((prev) => (prev + 1) % commands.length);
    } else if (key === "ArrowUp") {
      setSelectedCommand(
        (prev) => (prev - 1 + commands.length) % commands.length
      );
    } else if (key === "Enter") {
      handleExcuteCommand();
      setIsOpen(false);
    } else if (key === "Escape") {
      setIsOpen(false);
    } else if ((e.ctrlKey && e.key === "k") || e.key === "/") {
      e.preventDefault();
      setIsOpen(true);
    }
  }

  function handleExcuteCommand() {
    dispatch(filteredCommands[selectedCommandIndex].fn());
  }

  function handleChange(value) {
    setSearchTerm(value);
  }
  return (
    <div
      className={`${isOpen ? "visible opacity-100" : "invisible opacity-0"} flex flex-col items-center  z-50 fixed top-0 left-0 w-screen h-screen bg-black/30`}
    >
      <div className="mt-32 max-w-[400px] w-11/12 mx-auto">
        <input
          className="w-full mb-4 border-2 border-solid border-[#333] px-4 py-2 rounded-lg"
          type="text"
          placeholder="Search command"
          value={searchTerm}
          onChange={(e) => handleChange(e.target.value)}
        />
        <ul className="">
          {filteredCommands.map((command, index) => (
            <li className="w-full" key={command.name}>
              <button
                className={`${selectedCommandIndex === index ? "bg-zinc-200" : "bg-white"} w-full px-4 py-2 border-b-2 border-solid border-black`}
              >
                {command.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
