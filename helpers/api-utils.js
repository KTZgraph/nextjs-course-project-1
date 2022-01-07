export async function getAllEvents() { //zwraca promisa
  const response = await fetch(
    "https://nextjs-course-28060-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();

  const events = [];
  for (const key in data) {
    // spread operator ...data[key] żeby nie przepisywać wszystkich kluczy z bazy recznie
    events.push({ id: key, ...data[key] });
  }

  return events;
}


export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured)
}


export async function getEventById(id) {
    const allEvents = await getAllEvents();
    return allEvents.filter((event) => event.id === id)
}