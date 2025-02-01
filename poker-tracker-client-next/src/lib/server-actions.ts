"use server";

import { redirect } from "next/navigation";
import prisma from "./prisma";
import { formSchema } from "./zod-schema";

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function createPokerGameAction(
  previousState: FormState,
  data: FormData
) {
  const formData = Object.fromEntries(data);
  const parsed = formSchema.safeParse(formData);
  if (!parsed.success) {
    console.log(parsed.error)
    return {
      message: "Invalid data",
      fields: parsed.data,
    };
  }
  console.log(parsed.data);
  const pokerGame = await prisma.pokerGame.create({
    data: {
      casinoId: parseInt(parsed.data.casinoId),
      gameTypeId: parsed.data.gameType == "PLO" ? 1 : 2,
      limit: parsed.data.limit,
      tablesNumber: parsed.data.tables,
      playerWaiting: parsed.data.playersWaiting,
    },
  });
  console.log(pokerGame)
  return { message: "Success", fields: {}};
}
