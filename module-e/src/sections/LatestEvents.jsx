import EventCard from "../components/EventCard";

const LATEST_EVENT_CONTENTS = [
  {
    title: "Lyon accueille la finale mondiale des Worldskills 2024",
    hightResImg: "images/latest-events-images/worldskills-2024-p.jpg",
    lowResImg: "images/latest-events-images/worldskills-2024-p-low-res.png",
  },
  {
    title: "Forum des associations 2024",
    hightResImg: "images/latest-events-images/fda-p.jpg",
    lowResImg: "images/latest-events-images/fda-p-low-res.jpg",
  },
  {
    title: "Lyon Kayak",
    hightResImg: "images/latest-events-images/lyon-kayak-p-0.jpg",
    lowResImg: "images/latest-events-images/lyon-kayak-p-0-low-res.jpg",
  },
  {
    title: "La semaine bleue 2024",
    hightResImg: "images/latest-events-images/semaine-bleue-2024-p.jpg",
    lowResImg: "images/latest-events-images/semaine-bleue-2024-p-low-res.jpg",
  },
  {
    title: "Le Village des Métiers",
    hightResImg: "images/latest-events-images/village-des-metiers-p.jpg",
    lowResImg: "images/latest-events-images/village-des-metiers-p-low-res.jpg",
  },
  {
    title: "Les Journées Portes Ouvertes des Entreprises",
    hightResImg:
      "images/latest-events-images/journees_portes_ouvertes_entreprises_2023_p.jpg",
    lowResImg:
      "images/latest-events-images/journees_portes_ouvertes_entreprises_2023_p-low-res.jpg",
  },
];

export default function LatestEvents() {
  return (
    <div id="essential-information" className="w-full h-screen space-y-8">
      <h2 className="text-4xl font-bold text-center mt-20">Latest Events</h2>
      <ul className="flex overflow-scroll">
        {LATEST_EVENT_CONTENTS.map((event, index) => (
          <li key={index} className="mb-8 grow shrink-0 w-full">
            <EventCard
              title={event.title}
              hightResImg={event.hightResImg}
              lowResImg={event.lowResImg}
              isWideScreen={window.innerWidth > 760}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
