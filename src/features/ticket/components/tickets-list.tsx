import { getTickets } from "@/features/queries/get-tickets";

import { TicketItem } from "./ticketItem";

const TicketsList = async () => {
  const mockTicketsData = await getTickets();

  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
      {mockTicketsData.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export default TicketsList;
