// react component
// notacja event-list zamiast EventList jak w czystym Reacie żeby rozpoznbnać które to komponenty Reacta a które Nexta
// indywidualnie mozna taki tak nazywać
import EventItem from "./event-item";


function EventList(props) {
  // props - eventy są z zewnątrz poprzekazane dane
  const { items } = props;

  return <ul>{items.map(event => <EventItem />)}</ul>;
}

export default EventList;