import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { getAllEvents } from "../../helpers/api-utils";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

function AllEventPage(props) {
  const router = useRouter(); // wszystkie komponenty reacta msuza byc w glownym komponencie
  const { events } = props;

  function findEventsHandler(year, month) {
    // wymuszenie żeby [..slug].js było uruchomione dlatego dwie zmienne
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events tha allow you to evolve..."
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events: events,
    },
    revalidate: 60, //co minutę jak nowy request przychodzi to rerenderujemy stronę
  };
}

export default AllEventPage;
