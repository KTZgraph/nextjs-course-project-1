// react component
// notacja event-list zamiast EventList jak w czystym Reacie żeby rozpoznbnać które to komponenty Reacta a które Nexta
// indywidualnie mozna taki tak nazywać
import EventItem from "./event-item";
import classes from './event-list.module.css';

function EventList(props) {
  // props - eventy są z zewnątrz poprzekazane dane
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items.map((event) => (
        //   pamieać o key,które jest wymagane przez REact!
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          location={event.location}
          data={event.date}
          image={event.image}
        />
      ))}
    </ul>
  );
}

export default EventList;
