import { mockTicketsData } from "@/data";

import { Ticket } from "../ticket/types";

export const getTicket = async (ticketId: string): Promise<Ticket | null> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const ticket = mockTicketsData.find((ticket) => ticket.id === ticketId);

  return new Promise((resolve) => resolve(ticket ?? null));
};
