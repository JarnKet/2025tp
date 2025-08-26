import { useEffect, useRef, useState } from "react";
import { getEvents } from "../service/api";
import { useSearchParams } from "react-router-dom";
import EventCard from "../components/EventCard";

export default function Events() {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultBeginningDate =
    searchParams.get("beginning_date") || "2024-09-01";
  const defaultEndingDate = searchParams.get("ending_date") || "2025-12-31";

  const [events, setEvents] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const [beginningDate, setBeginningDate] = useState(defaultBeginningDate);
  const [endingDate, setEndingDate] = useState(defaultEndingDate);

  const observerRef = useRef(null);

  useEffect(() => {
    const firstPageUrl = `/module_c_api.php/events.json?page=1&beginning_date=${beginningDate}&ending_date=${endingDate}`;
    setEvents([]);
    setNextUrl(firstPageUrl);
    setSearchParams({
      beginning_date: beginningDate,
      ending_date: endingDate,
    });
  }, [beginningDate, endingDate]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry && entry.isIntersecting && !loading && nextUrl) {
        fetchEvents(nextUrl);
      }
    }, options);

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
        observer.disconnect();
      }
    };
  }, [nextUrl, loading]);

  async function fetchEvents(url) {
    if (!url) return;
    setLoading(true);

    try {
      const res = await getEvents(url);
      setEvents((prev) => [...prev, ...res.events]);
      setNextUrl(res.pages.next);
    } catch (error) {
      console.error(`Error fetching events: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  function handleChangeDate(type, value) {
    switch (type) {
      case "beginning_date": {
        setBeginningDate(value);
        setSearchParams({
          beginning_date: beginningDate,
        });
        break;
      }
      case "ending_date": {
        setEndingDate(value);
        setSearchParams({
          ending_date: endingDate,
        });
        break;
      }
    }
  }

  return (
    <section id="events">
      <div className="flex flex-wrap gap-2 justify-center">
        <div className="flex flex-col gap-1">
          <label htmlFor="beginning_date">Beginning date</label>
          <input
            id="beginning_date"
            type="date"
            className="border border-solid border-zinc-500 px-2 py-1 rounded-lg"
            value={beginningDate}
            onChange={(e) => handleChangeDate("beginning_date", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="ending_date">Ending date</label>
          <input
            id="ending_date"
            type="date"
            className="border border-solid border-zinc-500 px-2 py-1 rounded-lg"
            value={endingDate}
            onChange={(e) => handleChangeDate("ending_date", e.target.value)}
          />
        </div>
      </div>

      <ul className="flex flex-col justify-center my-8 gap-8">
        {events.map((event) => (
          <li key={event.title}>
            <EventCard event={event} />
          </li>
        ))}
      </ul>

      {loading ? <p className="text-center">Loading...</p> : ""}
      <div ref={observerRef}></div>
    </section>
  );
}
