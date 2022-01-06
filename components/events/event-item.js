import Button from "../ui/button";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import classes from "./event-item.module.css";

function EventItem(props) {
  const { title, image, date, location, id } = props;

  // https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
  const humanReadableData = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // string replace bo ulica i miasto oddzielone przecinkiem
  const formattedAddress = location.replace(", ", "\n");

  // konstrukcja linku do konkretnego wydarzenia po id
  const exploreLink = `/events/${id}`;

  // dla konkrentych danych
  return (
    <l1 className={classes.item}>
      {/* nie trzeba dodawać publixc na początek, bo folder public jest dostepny wszedzie */}
      <img src={"/" + image} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            {/* ikonki */}
            <DateIcon />
            <time>{humanReadableData}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          {/* technicznie to dalej <Link ale będzie wygladac jak przycisk */}
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </l1>
  );
}

export default EventItem;
