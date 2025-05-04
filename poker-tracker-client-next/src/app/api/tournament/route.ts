import prisma from "@/lib/prisma"; // Ensure you have Prisma set up
import { tournamentSchema } from "@/lib/zod-schema";
import { BlobServiceClient } from "@azure/storage-blob";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    console.log(formData);
    const data = JSON.parse(formData.get("data") as string);
    data.image = formData.get("image") as File | null;

    const validatedData = tournamentSchema.safeParse(data);
    if (!validatedData.success || !validatedData.data) {
      return NextResponse.json(
        { success: false, errors: validatedData.error.message },
        { status: 400 },
      );
    }

    const imageFile = formData.get("image") as File | null;
    let imageUrl = "";
    if (imageFile) {
      const blobServiceClient = BlobServiceClient.fromConnectionString(
        process.env.SA_CONN_STRING!,
      );
      const containerClient = blobServiceClient.getContainerClient(
        process.env.CASINO_TOURNAMENTS_CONTAINER!,
      );

      const blobName = `${uuidv4()}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      const arrayBuffer = await imageFile.arrayBuffer();
      await blockBlobClient.uploadData(arrayBuffer, {
        blobHTTPHeaders: { blobContentType: imageFile.type },
      });

      imageUrl = blockBlobClient.url;
    }

    const game = await prisma.tournament.create({
      data: {
        name: validatedData.data.name,
        imageUrl: imageUrl,
        casinoId: parseInt(validatedData.data.casinoId),
        startTime: validatedData.data.startTime,
        information: validatedData.data.information,
        weeklyTournament: validatedData.data.weeklyTournament,
      },
    });
    return NextResponse.json(game);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
