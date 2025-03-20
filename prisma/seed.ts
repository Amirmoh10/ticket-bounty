import { prisma } from "@/lib/prisma-client";

const tickets = [
  {
    title: "Ticket 1",
    content: "This is 1 ticket from database",
    status: "DONE" as const,
  },
  {
    title: "Ticket 2",
    content: "This is 2 ticket from database",
    status: "OPEN" as const,
  },
  {
    title: "Ticket 3",
    content: "This is 3 ticket from database",
    status: "IN_PROGRESS" as const,
  },
];

const seed = async () => {
  const startTime = performance.now();
  console.log("seeding tickets started...");

  //first delete all tickets
  await prisma.ticket.deleteMany();

  //then create new ones tickets
  await prisma.ticket.createMany({ data: tickets });

  const endTime = performance.now();
  console.log(`seeding tickets completed in ${endTime - startTime}ms`);
};

seed();
