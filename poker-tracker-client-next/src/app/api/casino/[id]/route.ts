import prisma from "@/lib/prisma";
import { casinoDetailsSchema } from "@/lib/zod-schema";
import { NextRequest, NextResponse } from "next/server";
import { BlobServiceClient } from "@azure/storage-blob";
import { v4 as uuidv4 } from "uuid";

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
        message: "Invalid casino ID",
        error: "ID must be a positive number",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const formData = await req.formData();
  console.log(formData);
  const data = JSON.parse(formData.get("data") as string);
  data.image = formData.get("image") as File | null;

  const validatedData = casinoDetailsSchema.safeParse(data);
  // Insert into database
  if (!validatedData.success || !validatedData.data) {
    return NextResponse.json(
      { success: false, errors: validatedData.error.message },
      { status: 400 },
    );
  }

  let imageUrl = data.imageUrl;
  const imageFile = formData.get("image") as File | null;
  if (imageFile) {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.SA_CONN_STRING!,
    );
    const containerClient = blobServiceClient.getContainerClient(
      process.env.CASINO_IMAGES_CONTAINER!,
    );

    const blobName = `${uuidv4()}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const arrayBuffer = await imageFile.arrayBuffer();
    await blockBlobClient.uploadData(arrayBuffer, {
      blobHTTPHeaders: { blobContentType: imageFile.type },
    });

    imageUrl = blockBlobClient.url;
  }
  const casinoData = validatedData.data;
  const casino = await prisma.casino.update({
    where: {
      id: parsedId,
    },
    data: {
      rake: casinoData.rake,
      information: casinoData.information,
      location: casinoData.location,
      imageUrl: imageUrl,
    },
  });
  return NextResponse.json(casino);
}
