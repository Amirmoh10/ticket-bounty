import { notFound } from "next/navigation";

import { CardCompact } from "@/components/card-compact";
import { getTicket } from "@/features/queries/get-ticket";
import TicketUpsertForm from "@/features/ticket/components/ticketUpsertForm";

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
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Edit Ticket"
        description="A ticket will be edited"
        className="w-full max-w-[420px] self-center"
        content={<TicketUpsertForm ticket={ticket} />}
      />
    </div>
  );
};

export default TicketEditPage;
