// dla dwóch i wiecej dynamicznych parametrów wejdzie tutaj a nie do [eventId].js
import { useRouter } from "next/router"; // z nexta
import { Fragment } from "react";

import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug; // dopiero jak się komponent wyrenderuje - wiec 2 razy sie wykonuje, nie problem ale trzeba sprawdzić czy mam yjuż dane

  if (!filterData) {
    // globalnie dostepny css
    return <p className="center">Loading...</p>;
  }

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
  const filteredEvens = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

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
  const date = new Date(numYear, numMonth - 1); // miescia zaczyna sie od zera
  return (
    <Fragment>
      <ResultsTitle data={date} />
      <EventList items={filteredEvens} />
    </Fragment>
  );
}

export default FilteredEventsPage;
