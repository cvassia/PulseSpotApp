import { prisma } from "./database.server";

///ALL EVENTS
export async function getEvents() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: "asc" },
    });
    return events;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get events");
  }
}

export async function getEventsByCity(city) {
  if (!city) {
    throw new Error("No events yet in this city");
  }
  try {
    const events = await prisma.event.findMany({
      where: { city: city },
      orderBy: { date: "asc" },
    });
    return events;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get events");
  }
}

/////favorites of a user
export async function getUserFavorites(userId) {
  try {
    const userFavorites = await prisma.user.findUnique({
      where: { id: userId },
      include: { favorites: true },
    });
    return userFavorites?.favorites;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get events");
  }
}

export async function getProvidersEvents(userId) {
  if (!userId) {
    throw new Error("Failed to get events");
  }
  try {
    const events = await prisma.event.findMany({
      where: { providerId: userId },
      orderBy: { date: "asc" },
    });
    return events;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get events");
  }
}

export async function getEvent(id) {
  try {
    const event = await prisma.event.findFirst({
      where: { id },
    });
    return event;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get event");
  }
}

export async function addEvent(eventData, userId) {
  try {
    return await prisma.event.create({
      data: {
        title: eventData.title,
        description: eventData.description,
        city: eventData.city,
        fullDescription: eventData.fullDescription,
        startTime: eventData.startTime,
        endTime: eventData.endTime,
        date: new Date(eventData.date),
        img: eventData.img,
        address: eventData.address,
        site: eventData.site,

        User: { connect: { id: userId } },
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add event");
  }
}

export async function updateEvent(id, eventData) {
  try {
    return await prisma.event.update({
      where: { id },
      data: {
        title: eventData.title,
        description: eventData.description,
        city: eventData.city,
        fullDescription: eventData.fullDescription,
        startTime: eventData.startTime,
        endTime: eventData.endTime,
        date: new Date(eventData.date),
        img: eventData.img,
        address: eventData.address,
        site: eventData.site,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update event");
  }
}

export async function deleteEvent(id) {
  try {
    await prisma.event.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete event");
  }
}
