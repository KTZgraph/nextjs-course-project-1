// dla dwóch i wiecej dynamicznych parametrów wejdzie tutaj a nie do [eventId].js
import { useRouter } from "next/router"; // z nexta
import { Fragment } from "react";

import {getFilteredEvents} from "../../helpers/api-utils";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredEventsPage(props) {


  //teraz już nie trzeba filtrować danych z urla - mamy to w getServerSideProps
  // const router = useRouter();

  // const filterData = router.query.slug; // dopiero jak się komponent wyrenderuje - wiec 2 razy sie wykonuje, nie problem ale trzeba sprawdzić czy mam yjuż dane

  // if (!filterData) {
  //   // globalnie dostepny css
  //   return <p className="center">Loading...</p>;
  // }

  // const filteredYear = filterData[0]; // zawsze string
  // const filteredMonth = filterData[1];

  // const numYear = +filteredYear; // zamiana na liczbę przez znak dodawania JS triczek
  // const numMonth = +filteredMonth;

  // walidacja czy dane z urla prawdiłowe, czy n. ktoś nie wpisał abss zamiast liczby
  if (props.hasError) { // gdy mamy konkrentgo propsa, ze jest błąd
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
      props: {hasError: true}, // konkrenty komunikat błedu
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
        month: numMonth
      }
    },
  };
}

export default FilteredEventsPage;
