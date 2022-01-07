import { Fragment } from "react";

import { getEventById, getFeaturedEvents } from "../../helpers/api-utils";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

function EventDetailPage(props) {
  const event = props.selectedEvent;

  // walidacja danych
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
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

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30//szybciej bo zmiana daty jest ważniejsza niż cała lista
  };
}

export async function getStaticPaths() {
  // instancje dla których trzeba wyrenderować wczesniej strony
  const events = await getFeaturedEvents(); // raczej się zmieniają i są ogladane tylko przyszłe wydarzenia
  //to tez w konsekwnecji sprawia, ze niektóe wydarzenia nie będę prerenderowane

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    // będzie starała się dynamcicnzie renderowac strony
    fallback: 'blocking' // jest wiecej stron niż te które się wyrenderowany
    //block nextjs niż nie srerwuje dopóki nie wyrenederujemy strony; trochę dłuzej to trwa ale zwraca już całą stronę
  }
}

export default EventDetailPage;
