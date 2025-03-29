"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma-client";
import { ticketsPath } from "@/paths";

export const upsertTicket = async (
  ticketId: string | undefined,
  formData: FormData
) => {
  const title = formData.get("title");
  const content = formData.get("content");
  const data = { title: title as string, content: content as string };

  await prisma.ticket.upsert({
    where: { id: ticketId ?? "" },
    update: data,
    create: data,
  });

  revalidatePath(ticketsPath());

  if (ticketId) {
    redirect(ticketsPath());
  }
};
