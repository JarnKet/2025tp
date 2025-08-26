// import { useLocation } from "react-router";
import {useLocation} from "react-router-dom"

export default function Header() {
  // const pathName = location.pathname.split("/").pop();

  const pathName = useLocation().pathname.split("/").pop();

  return (
    <div className="bg-[#333] py-2">
      <p className="text-5xl font-bold text-center text-white">{pathName}</p>
    </div>
  );
}
