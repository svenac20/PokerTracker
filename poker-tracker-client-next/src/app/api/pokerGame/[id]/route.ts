import prisma from "@/lib/prisma";
import { PokerGameDto } from "@/lib/types";
import { formSchema } from "@/lib/zod-schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const parsedId = parseInt(id);

  // Validate ID is a positive number
  if (isNaN(parsedId) || parsedId <= 0) {
    return new NextResponse(
      JSON.stringify({
        message: "Invalid poker game ID",
        error: "ID must be a positive number",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const body = await req.json();
  const validatedData = formSchema.safeParse(body);

  // Insert into database
  if (!validatedData.success || !validatedData.data) {
    return NextResponse.json(
      { success: false, errors: validatedData.error },
      { status: 400 },
    );
  }
  const pokerGameData = validatedData.data;
  // Validate ID is a positive number
  const pokerGame = await prisma.pokerGame.update({
    where: {
      id: parsedId,
    },
    data: {
      casinoId: parseInt(pokerGameData.casinoId),
      gameTypeId: pokerGameData.gameType === "PLO" ? 1 : 2,
      gameStarted: pokerGameData.gameStarted,
      startTime: pokerGameData.startTime,
      limit: pokerGameData.limit,
      tablesNumber: pokerGameData.tables,
      playerWaiting: pokerGameData.playersWaiting,
    },
    include: {
      casino: {
        select: {
          name: true,
        },
      },
    },
  });

  const pokerGameDto = {
    id: pokerGame.id,
    casinoId: pokerGame.casinoId,
    casinoName: pokerGame.casino.name,
    startTime: pokerGame.startTime,
    gameStarted: pokerGame.gameStarted,
    limit: pokerGame.limit,
    tablesNumber: pokerGame.tablesNumber,
    playerWaiting: pokerGame.playerWaiting,
    gameType: pokerGame.gameTypeId === 1 ? "PLO" : "NLH",
  } as PokerGameDto;
  return NextResponse.json(pokerGameDto);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const parsedId = parseInt(id);

  // Validate ID is a positive number
  if (isNaN(parsedId) || parsedId <= 0) {
    return new NextResponse(
      JSON.stringify({
        message: "Invalid poker game ID",
        error: "ID must be a positive number",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  await prisma.pokerGame.delete({
    where: {
      id: parsedId,
    },
  });

  return NextResponse.json({});
}
