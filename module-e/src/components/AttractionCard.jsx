export default function AttractionCard({
  title,
  hightResImg,
  lowResImg,
  isHover,
  isWideScreen,
}) {
  return (
    <a
      href="#"
      className={`${isHover ? "scale-105" : "scale-1"} group inline-block bg-white h-full p-2 rounded-lg hover:scale-105 hover:cs-shadow transition-all duration-300`}
    >
      {/* Attraction image */}
      <div className="relative overflow-hidden">
        <img
          className="w-full h-full rounded-lg"
          src={isWideScreen ? hightResImg : lowResImg}
          alt={title}
        />

        {/* Subtle lighting effect when card hovered */}
        <div className="subtile-lighting-gradient absolute left-0 top-0 -translate-x-[150%] -skew-x-12 h-full w-[20%] group-hover:left-full group-hover:translate-x-full transition-all duration-300"></div>
      </div>

      {/* Tilte */}
      <p className="font-bold text-xl">{title}</p>
    </a>
  );
}
