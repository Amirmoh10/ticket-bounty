"use client";

import { Ticket } from "@prisma/client";
import { useActionState, useMemo } from "react";
import { toast } from "sonner";

import FieldError from "@/components/form/field-error";
import { useActionFeedback } from "@/components/form/hooks/useActionFeedback";
import { EMPTY_ACTION_STATE } from "@/components/form/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "@/features/actions/upsert-ticket";

import { SubmitButton } from "../../../components/form/submit-button";

export type TicketCreateFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketCreateFormProps) => {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE
  );

  const { message, payload, fieldErrors } = actionState;

  const options = useMemo(() => {
    return {
      onSuccess: () => {
        if (actionState.message) {
          toast.success(actionState.message);
        }
      },
      onError: () => {
        if (actionState.message) {
          toast.error(actionState.message);
        }
      },
    };
  }, [actionState]);

  useActionFeedback(actionState, options);

  return (
    <form action={action} className="flex flex-col gap-y-2">
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
    </form>
  );
};

export default TicketUpsertForm;
