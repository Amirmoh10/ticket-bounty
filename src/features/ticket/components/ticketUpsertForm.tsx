"use client";

import { Ticket } from "@prisma/client";
import { useActionState } from "react";

import { upsertTicket } from "@/actions/upsert-ticket";
import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import { EMPTY_ACTION_STATE } from "@/components/form/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { SubmitButton } from "../../../components/form/submit-button";

export type TicketCreateFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketCreateFormProps) => {
  const [state, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE
  );

  const { message, payload, fieldErrors } = state;

  return (
    <Form action={action} actionState={state}>
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        name="title"
        type="text"
        defaultValue={(payload?.get("title") as string) ?? ticket?.title}
      />
      <FieldError fieldErrors={fieldErrors ?? {}} errorName="title" />
      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={(payload?.get("content") as string) ?? ticket?.content}
      />
      <FieldError fieldErrors={fieldErrors ?? {}} errorName="content" />
      <SubmitButton label={ticket ? "Edit" : "Create"} />
      {message}
    </Form>
  );
};

export default TicketUpsertForm;
