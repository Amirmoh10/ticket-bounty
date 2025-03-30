"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { prisma } from "@/lib/prisma-client";
import { ticketsPath } from "@/paths";

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
});

export const upsertTicket = async (
  ticketId: string | undefined,
  _state: {
    message: string;
    payload?: FormData;
    fieldErrors?: Record<string, string[] | undefined>;
  },
  formData: FormData
) => {
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
    if (error instanceof z.ZodError) {
      return {
        message: "",
        payload: formData,
        fieldErrors: error.flatten().fieldErrors,
      };
    } else if (error instanceof Error) {
      return { message: error.message, payload: formData };
    } else {
      return { message: "An unknown error occurred", payload: formData };
    }
  }

  revalidatePath(ticketsPath());

  if (ticketId) {
    redirect(ticketsPath());
  }

  return { message: "Ticket created successfully" };
};
