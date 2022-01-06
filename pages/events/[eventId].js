import { useRouter } from "next/router";
import { Fragment } from "react";

import {getEventById} from "../../dummy-data"; // pamietac, że to nie jedyna eksportowana funckja!
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

function EventDetailPage() {
  const router = useRouter();

  const eventId = router.query.eventId;
  console.log("\n\n\n\n\n")
  console.log("eventId: ", eventId)
  const event = getEventById(eventId);
  console.log("event: ", event)


  // walidacja danych
  if (!event) {
    return <p>No event found</p>;
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export default EventDetailPage;
