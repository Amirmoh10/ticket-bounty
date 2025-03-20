import { prisma } from "@/lib/prisma-client";

import { Ticket } from "../ticket/types";

const getTickets = async (): Promise<Ticket[]> => {
  const tickets = await prisma.ticket.findMany();

  return tickets;
};

export { getTickets };
