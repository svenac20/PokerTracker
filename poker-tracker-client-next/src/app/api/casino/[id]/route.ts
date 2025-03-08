import prisma from "@/lib/prisma";
import { PokerGameDto } from "@/lib/types";
import { casinoDetailsSchema, formSchema } from "@/lib/zod-schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const parsedId = parseInt(id);

  // Validate ID is a positive number
  if (isNaN(parsedId) || parsedId <= 0) {
    return new NextResponse(
      JSON.stringify({
        message: "Invalid casino ID",
        error: "ID must be a positive number",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const body = await req.json();
  const validatedData = casinoDetailsSchema.safeParse(body);
  // Insert into database
  if (!validatedData.success || !validatedData.data) {
    return NextResponse.json(
      { success: false, errors: validatedData.error },
      { status: 400 }
    );
  }
  const casinoData = validatedData.data;
  const casino = await prisma.casino.update({
    where: {
      id: parsedId,
    },
    data: {
      ...casinoData
    },
  });
  return NextResponse.json(casino)
}
