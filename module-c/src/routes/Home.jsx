import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();


  useEffect(() => {


   navigate("/carparks");
  }, [])


  return (
    <section id="home">
      <div className="mobile-container sm:cs-container"></div>
    </section>
  );
}
