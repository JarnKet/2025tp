import { useEffect, useState } from "react";
import Naivgation from "./components/Navigation";
import CallToAction from "./sections/CallToAction";
import MapAttractions from "./sections/MapAttractions";
import Video from "./sections/Video";
import EssentialInformation from "./sections/EssentialInformation";
import LatestEvents from "./sections/LatestEvents";
import OtherInformation from "./sections/OtherInfomation";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import EventCalendar from "./sections/EventCalendar";
import ReviewSlider from "./sections/ReviewSlider";
import CouponEvent from "./sections/CouponEvent";

export default function App() {
  const [isWideScreen, setIsWideScreen] = useState(
    () => window.innerWidth > 760
  );

  useEffect(() => {
    function hanldeResize() {
      setIsWideScreen(window.innerWidth >= 760);
    }

    window.addEventListener("resize", hanldeResize);

    return () => window.addEventListener("resize", hanldeResize);
  }, []);

  return (
    <>
      {/* Navigation */}
      <header className="fixed top-0 left-0 z-50 w-full backdrop-blur-sm">
        <Naivgation />
      </header>

      {/* Main content */}
      <main id="main-content" className="space-y-16">
        {/* Call to action section */}
        <CallToAction isWideScreen={isWideScreen} />

        {/* Map acttractions */}
        <MapAttractions isWideScreen={isWideScreen} />

        {/* Video */}
        <Video />

        {/* Essential information and latest events */}
        <div className="cs-container grid grid-cols-2">
          <EssentialInformation />
          <LatestEvents />
        </div>

        {/* Other information */}
        <OtherInformation />

        {/* Event Calendar */}
        <EventCalendar />

        {/* Review Slider */}
        <ReviewSlider />

        {/* Coupon Event */}
        <CouponEvent />

        {/* Contact form */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
