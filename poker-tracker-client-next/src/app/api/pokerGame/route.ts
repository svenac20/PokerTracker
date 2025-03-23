import prisma from "@/lib/prisma"; // Ensure you have Prisma set up
import { PokerGameDto } from "@/lib/types";
import { mapPokerGameToPokerGameDto } from "@/lib/utils";
import { formSchema } from "@/lib/zod-schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = formSchema.safeParse(body);

    // Insert into database
    if (!validatedData.success || !validatedData.data) {
      return NextResponse.json(
        { success: false, errors: validatedData.error },
        { status: 400 },
      );
    }
    console.log(validatedData.data);
    const game = await prisma.pokerGame.create({
      data: {
        casinoId: parseInt(validatedData.data.casinoId),
        gameTypeId: validatedData.data.gameType === "PLO" ? 1 : 2,
        gameStarted: validatedData.data.gameStarted,
        limit: validatedData.data.limit,
        tablesNumber: validatedData.data.tables,
        playerWaiting: validatedData.data.playersWaiting,
        startTime: validatedData.data.startTime,
      },
      include: {
        gameType: {
          select: {
            name: true,
          },
        },
        casino: {
          select: {
            name: true,
          },
        },
      },
    });
    const pokerGameDto: PokerGameDto = mapPokerGameToPokerGameDto(game);
    return NextResponse.json(pokerGameDto);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
