"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { ActionState } from "@/components/form/utils";
import { prisma } from "@/lib/prisma-client";
import { ticketsPath } from "@/paths";

import { setCookieByKey } from "./cookies";

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
});

export const upsertTicket = async (
  ticketId: string | undefined,
  _actionState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const title = formData.get("title");
  const content = formData.get("content");

  try {
    const data = upsertTicketSchema.parse({
      title: title,
      content: content,
    });

    await prisma.ticket.upsert({
      where: { id: ticketId ?? "" },
      update: data,
      create: data,
    });
  } catch (error) {
    // Handle zod errors
    if (error instanceof z.ZodError) {
      return {
        status: "ERROR",
        message: "",
        payload: formData,
        fieldErrors: error.flatten().fieldErrors,
        timestamp: new Date(),
      };
    } else if (error instanceof Error) {
      // Handle database or ORMerrors
      return {
        status: "ERROR",
        message: error.message,
        payload: formData,
        fieldErrors: undefined,
        timestamp: new Date(),
      };
    } else {
      // Handle unknown errors
      return {
        status: "ERROR",
        message: "An unknown error occurred", //return a generic error message
        payload: formData,
        fieldErrors: undefined,
        timestamp: new Date(),
      };
    }
  }

  revalidatePath(ticketsPath());

  if (ticketId) {
    setCookieByKey("toast", "Ticket updated");
    redirect(ticketsPath());
  }

  return {
    status: "SUCCESS",
    message: "Ticket created successfully",
    fieldErrors: undefined,
    timestamp: new Date(),
  };
};
