import { prisma } from "@/lib/prisma-client";

export const getTicket = async (ticketId: string) => {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  });

  return ticket;
};
