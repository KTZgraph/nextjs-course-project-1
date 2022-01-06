import { getFeaturedEvents } from "../dummy-data";
import EventList from '../components/events/event-list';

function HomePage() {
  // przyszłe wydarzenia
  const featureEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={featureEvents}/>
    </div>
  );
}

export default HomePage;
