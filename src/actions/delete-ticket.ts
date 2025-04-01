"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma-client";
import { ticketsPath } from "@/paths";

import { setCookieByKey } from "./cookies";

export const deleteTicket = async (id: string) => {
  await prisma.ticket.delete({
    where: { id },
  });

  revalidatePath(ticketsPath());
  setCookieByKey("toast", "Ticket deleted");
  redirect(ticketsPath());
};
