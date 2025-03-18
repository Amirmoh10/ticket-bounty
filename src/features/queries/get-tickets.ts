import { mockTicketsData } from "@/data";

import { Ticket } from "../ticket/types";

const getTickets = async (): Promise<Ticket[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return mockTicketsData;
};

export { getTickets };
