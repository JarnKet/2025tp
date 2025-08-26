import { useEffect, useRef } from "react";

export default function Video() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const isIntersecting = useRef(false); // Track visibility

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        videoRef.current && videoRef.current.pause();
      } else {
        if (isIntersecting.current) {
          videoRef.current && videoRef.current.play();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersecting.current =
            entry.isIntersecting && entry.intersectionRatio >= 0.5;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            videoRef.current && videoRef.current.play();
          } else {
            videoRef.current && videoRef.current.pause();
          }
        });
      },
      {
        threshold: 0.5, // Play/pause when 50% visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <section id="video" className="w-full h-screen" ref={sectionRef}>
      <video
        className="inline-block w-full h-full"
        ref={videoRef}
        src="videos/lyon.mp4"
        muted
      ></video>
    </section>
  );
}
