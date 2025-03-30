"use client";

import { Ticket } from "@prisma/client";
import { useActionState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "@/features/actions/upsert-ticket";

import { SubmitButton } from "./submit-button";

export type TicketCreateFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketCreateFormProps) => {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    {
      message: "",
      fieldErrors: undefined,
      payload: undefined,
    }
  );

  const { message, payload, fieldErrors } = actionState;

  return (
    <form action={action} className="flex flex-col gap-y-2">
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        name="title"
        type="text"
        defaultValue={(payload?.get("title") as string) ?? ticket?.title}
      />
      <span>{fieldErrors?.title?.[0]}</span>
      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={(payload?.get("content") as string) ?? ticket?.content}
      />
      <span>{fieldErrors?.content?.[0]}</span>

      <SubmitButton label={ticket ? "Edit" : "Create"} />
      {message}
    </form>
  );
};

export default TicketUpsertForm;
