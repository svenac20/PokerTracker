import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  // Validate ID is a positive number
  if (isNaN(id) || id <= 0) {
    return new NextResponse(
      JSON.stringify({
        message: "Invalid poker game ID",
        error: "ID must be a positive number",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const pokerGame = await prisma.pokerGame.findUnique({
    where: {
      id: id,
    },
    include: {
        casino: {
            select: {
                name: true,
            }
        },
    }
  });

  if (!pokerGame) {
    return new NextResponse(
      JSON.stringify({
        message: "Poker game not found",
        error: "No poker game with the specified ID",
      }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const pokerGameDto = {
    id: pokerGame.id,
    casinoId: pokerGame.casinoId,
    casinoName: pokerGame.casino.name,
    gameTypeId: pokerGame.gameTypeId,
    limit: pokerGame.limit,
    tablesNumber: pokerGame.tablesNumber,
    playerWaiting: pokerGame.playerWaiting,
  }
  return NextResponse.json(pokerGameDto)
}
