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
  _state: { message: string },
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
    return { message: "Something went wrong", payload: formData };
  }

  revalidatePath(ticketsPath());

  if (ticketId) {
    redirect(ticketsPath());
  }

  return { message: "Ticket created successfully" };
};
