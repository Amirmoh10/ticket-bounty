import { Suspense } from "react";

import { Heading } from "@/components/heading";
import Spinner from "@/components/spinner";
import TicketsList from "@/features/ticket/components/tickets-list";

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets at one place" />
      <Suspense fallback={<Spinner />}>
        <TicketsList />
      </Suspense>
    </div>
  );
};

export default TicketsPage;
