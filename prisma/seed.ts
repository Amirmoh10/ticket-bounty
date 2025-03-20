import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tickets = [
  {
    title: "Ticket 1",
    content: "Ticket 1 content",
    status: "DONE" as const,
  },
  {
    title: "Ticket 2",
    content: "Ticket 2 content",
    status: "OPEN" as const,
  },
  {
    title: "Ticket 3",
    content: "This is the third ticket.",
    status: "IN_PROGRESS" as const,
  },
];

const seed = async () => {
  //first delete all tickets
  await prisma.ticket.deleteMany();

  //then create new ones tickets
  await prisma.ticket.createMany({ data: tickets });
};

seed();
