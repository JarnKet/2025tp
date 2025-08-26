export default function EventCard({ event }) {
  const { title, image, date } = event;
  return (
    <div className="w-full border-4 border-solid border-[#333]">
      <div className="w-full h-[400px]">
        <img
          className="w-full h-full"
          src={`http://ws01.worldskills.org${image}`}
          alt={title}
        />
      </div>
      <div className="px-2 py-2">
        <p className="text-2xl font-bold">{title}</p>
        <p className="text-sm text-zinc-500">{date}</p>
      </div>
    </div>
  );
}
