import { Fragment } from "react";
import { useRouter } from "next/router";

import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

function AllEventPage() {
  const events = getAllEvents();
  const router = useRouter(); // wszystkie komponenty reacta msuza byc w glownym komponencie

  function findEventsHandler(year, month) {
    // wymuszenie żeby [..slug].js było uruchomione dlatego dwie zmienne
    const fullPath = `/events/${year}/${month}`
    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export default AllEventPage;
