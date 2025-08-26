import { CallToActionButton } from "../components/Buttons";

export default function CallToAction({ isWideScreen }) {
  return (
    <section id="call-to-action" className="h-screen">
      <div className="w-full h-full relative">
        <img
          className="w-full h-full object-cover"
          src={isWideScreen ? "images/cover.jpg" : "images/cover-low-res.jpg"}
          alt="Street in Lyon lined with some shop and cafes and parked greed scooter"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <CallToActionButton />
        </div>
      </div>
    </section>
  );
}
