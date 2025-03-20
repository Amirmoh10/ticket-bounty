"use server";

import { prisma } from "@/lib/prisma-client";

export const deleteTicket = async (id: string) => {
  await prisma.ticket.delete({
    where: { id },
  });
};
