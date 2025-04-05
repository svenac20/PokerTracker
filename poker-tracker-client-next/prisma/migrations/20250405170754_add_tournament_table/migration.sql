-- CreateTable
CREATE TABLE "Tournaments" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameStarted" BOOLEAN NOT NULL DEFAULT false,
    "casinoId" INTEGER NOT NULL,

    CONSTRAINT "Tournaments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tournaments" ADD CONSTRAINT "Tournaments_casinoId_fkey" FOREIGN KEY ("casinoId") REFERENCES "Casino"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
