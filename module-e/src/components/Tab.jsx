export default function Tab({ title, isSelected, onClick }) {
  return (
    <button
      aria-selected={isSelected}
      aria-label={`Select tab ${title}`}
      className={`${isSelected ? "border-sky-500" : "border-[#333]"} px-4 py-2 border-4 border-solid `}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
