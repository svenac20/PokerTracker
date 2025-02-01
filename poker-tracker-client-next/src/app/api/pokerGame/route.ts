import prisma from "@/lib/prisma"; // Ensure you have Prisma set up
import { PokerGame } from "@/lib/types";
import { formSchema } from "@/lib/zod-schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = formSchema.safeParse(body);

    console.log(validatedData)
    // Insert into database
    if (!validatedData.success || !validatedData.data) {
      return NextResponse.json(
        { success: false, errors: validatedData.error },
        { status: 400 }
      );
    }
    console.log("AAA")
    const game = await prisma.pokerGame.create({
      data: {
        casinoId: parseInt(validatedData.data.casinoId),
        gameTypeId: validatedData.data.gameType === "PLO" ? 1 : 2,
        limit: validatedData.data.limit,
        tablesNumber: validatedData.data.tables,
        playerWaiting: validatedData.data.playersWaiting,
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
        }
      }
    });
    const pokerGameDto: PokerGame = {
        id: game.id,
        casinoId: game.casinoId,
        casinoName: game.casino.name,
        gameType: game.gameType.name,
        limit: game.limit,
        tablesNumber: game.tablesNumber,
        playerWaiting: game.playerWaiting
    }
    return NextResponse.json(pokerGameDto);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }
    console.log(error)
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
