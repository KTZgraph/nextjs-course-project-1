import { getFeaturedEvents } from '../helpers/api-utils';
import EventList from '../components/events/event-list';

function HomePage(props) {
  // przyszłe wydarzenia
  return (
    <div>
      <EventList items={props.events}/>
    </div>
  );
}

export async function getStaticProps() {
  //fetch data from firebase
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents
    },
    // na nowo generowanie co pół godziny
    revalidate: 1800
  }
}

export default HomePage;
