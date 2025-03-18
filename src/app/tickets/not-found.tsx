import Link from "next/link";

import { Placeholder } from "@/components/placeholder";
import { buttonVariants } from "@/components/ui/button";
import { ticketsPath } from "@/paths";

const NotFound = () => {
  return (
    <Placeholder
      label="Ticket not found"
      button={
        <Link
          href={ticketsPath()}
          className={buttonVariants({ variant: "outline" })}
        >
          Go to Tickets
        </Link>
      }
    />
  );
};

export default NotFound;
