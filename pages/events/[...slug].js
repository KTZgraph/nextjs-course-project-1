// dla dwóch i wiecej dynamicznych parametrów wejdzie tutaj a nie do [eventId].js
import { useRouter } from "next/router"; // z nexta
import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";

import { getFilteredEvents } from "../../helpers/api-utils";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredEventsPage(props) {
  const [loadedEvents, setLoadedEvents] = useState();
  //potrzebne dane do pobierania dancyh po stronie klienta
  const router = useRouter();

  const filterData = router.query.slug; // dopiero jak się komponent wyrenderuje - wiec 2 razy sie wykonuje, nie problem ale trzeba sprawdzić czy mam yjuż dane

  const { data, error } = useSWR(
    "https://nextjs-course-28060-default-rtdb.firebaseio.com/events"
  );

  useEffect(() => {
    if (data) {
      //transformacja danych
      const events = [];
      for (const key in data) {
        // spread operator ...data[key] żeby nie przepisywać wszystkich kluczy z bazy recznie
        events.push({ id: key, ...data[key] });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0]; // zawsze string
  const filteredMonth = filterData[1];

  const numYear = +filteredYear; // zamiana na liczbę przez znak dodawania JS triczek
  const numMonth = +filteredMonth;

  //trochę skrót - noramlnei chcemy pobrac tylko te dane któe spełniają filtry
  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
  });

  // pobieranie po stronie klienta

  // walidacja czy dane z urla prawdiłowe, czy n. ktoś nie wpisał abss zamiast liczby
  if (props.hasError) { //już teraz nie będzie działać bo nie używamy renderowania po strownie serwera tylko klienta
    // gdy mamy konkrentgo propsa, ze jest błąd
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          {/* globalna klasa żeby przycisk był na środku */}
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  // szukanie danych po dacie
  const filteredEvens = props.events; // już są wyfiltrowane w getServerSideProps

  //może nie być w bazie tego
  if (!filteredEvens || filteredEvens.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          {/* globalna klasa żeby przycisk był na środku */}
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  //ektra nagłówek nad wyfiltrowanymi eventami
  const date = new Date(props.date.year, props.date.month - 1); // miescia zaczyna sie od zera
  return (
    <Fragment>
      <ResultsTitle data={date} />
      <EventList items={filteredEvens} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  // to jest ok, ale z pobieraniem po stronie klienta dane będą się pobierać trochę szybciej
  // i ten widok nie jest tak ważny dla search engines
  const { params } = context;

  const filterData = params.slug;

  const filteredYear = filterData[0]; // zawsze string
  const filteredMonth = filterData[1];

  const numYear = +filteredYear; // zamiana na liczbę przez znak dodawania JS triczek
  const numMonth = +filteredMonth;

  // walidacja czy dane z urla prawdiłowe, czy n. ktoś nie wpisał abss zamiast liczby
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    //gdy nie udało się pobrac danych z filtra
    return {
      props: { hasError: true }, // konkrenty komunikat błedu
      // notFound: true, // 404
      // redirect: { // przekirowanie do jakieś strony
      //   destination:'/error'
      // }
    };
  }

  // szukanie danych po dacie
  const filteredEvens = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvens,
      // do naglowka w wyfiltrowanych danych
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}

export default FilteredEventsPage;
