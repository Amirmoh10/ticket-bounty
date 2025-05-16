import { prisma } from "@/lib/prisma-client";

const tickets = [
  {
    title: "Ticket 1",
    content: "This is 1 ticket from database",
    status: "DONE" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 499,
  },
  {
    title: "Ticket 2",
    content: "This is 2 ticket from database",
    status: "OPEN" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 399,
  },
  {
    title: "Ticket 3",
    content: "This is 3 ticket from database",
    status: "IN_PROGRESS" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 599,
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
