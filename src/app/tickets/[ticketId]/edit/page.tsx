import { notFound } from "next/navigation";

import { CardCompact } from "@/components/card-compact";
import { getTicket } from "@/features/queries/get-ticket";
import TicketForm from "@/features/ticket/components/ticketCreateForm";

type TicketEditPageParams = {
  params: Promise<{ ticketId: string }>;
};

const TicketEditPage = async ({ params }: TicketEditPageParams) => {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  if (!ticket) {
    notFound();
  }

  return (
    <div>
      <CardCompact
        title="Create Ticket"
        description="A new ticket will be created"
        className="w-full max-w-[420px] self-center"
        content={<TicketForm ticket={ticket} />}
      />
    </div>
  );
};

export default TicketEditPage;
