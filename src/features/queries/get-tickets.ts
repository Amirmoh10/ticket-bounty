import { Ticket } from "@prisma/client";

import { prisma } from "@/lib/prisma-client";

const getTickets = async (): Promise<Ticket[]> => {
  const tickets = await prisma.ticket.findMany();

  return tickets;
};

export { getTickets };
