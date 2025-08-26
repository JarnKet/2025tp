export default function Pin({ children }) {
  return (
    <div className="w-[50px] h-[50px] bg-red-500 rounded-full relative flex justify-center items-center">
      <p className="font-bold text-white text-center">{children}</p>
      <div className="absolute bottom-0 left-1/2 translate-y-[79%] -translate-x-1/2 border-[20px] border-solid border-transparent border-t-red-500"></div>
    </div>
  );
}
