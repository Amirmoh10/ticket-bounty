"use client";

import { Ticket } from "@prisma/client";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

import { upsertTicket } from "@/actions/upsert-ticket";
import DatePicker from "@/components/date-picker";
import FieldError from "@/components/form/field-error";
import { ActionState } from "@/components/form/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toCurrencyFromCent } from "@/lib/utils";

import { SubmitButton } from "../../../components/form/submit-button";

export type TicketCreateFormProps = {
  ticket?: Ticket;
};

const INITIAL_ACTION_STATE: ActionState = {
  message: "",
  fieldErrors: {},
  timestamp: Date.now(),
};

const TicketUpsertForm = ({ ticket }: TicketCreateFormProps) => {
  const [state, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    INITIAL_ACTION_STATE
  );
  const { message, payload, status, fieldErrors } = state;

  const datePickerImperativeHandleRef = useRef<{
    reset: () => void;
  } | null>(null);

  useEffect(() => {
    if (status === "SUCCESS") {
      if (message) {
        toast.success(message);
      }

      datePickerImperativeHandleRef?.current?.reset();
    } else if (status === "ERROR") {
      if (message) {
        toast.error(message);
      }
    }
  }, [status, message]);

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

      <div className="flex gap-x-2 mb-1">
        <div className="flex-1 flex flex-col gap-y-1">
          <Label htmlFor="deadline">Deadline</Label>
          <DatePicker
            imperativeHandleRef={datePickerImperativeHandleRef}
            id="deadline"
            name="deadline"
            defaultValue={
              (state.payload?.get("deadline") as string) ?? ticket?.deadline
            }
          />
          <FieldError fieldErrors={fieldErrors ?? {}} errorName="deadline" />
        </div>
        <div className="flex-1 flex flex-col gap-y-1">
          <Label htmlFor="bounty">Bounty ($)</Label>
          <Input
            id="bounty"
            name="bounty"
            type="number"
            step=".01"
            defaultValue={
              (state.payload?.get("bounty") as string) ??
              (ticket?.bounty ? toCurrencyFromCent(ticket.bounty) : "")
            }
          />
          <FieldError fieldErrors={fieldErrors ?? {}} errorName="bounty" />
        </div>
      </div>

      <SubmitButton label={ticket ? "Edit" : "Create"} />
    </form>
  );
};

export default TicketUpsertForm;
