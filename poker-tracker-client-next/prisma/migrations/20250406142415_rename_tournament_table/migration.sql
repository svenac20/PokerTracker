/*
  Warnings:

  - You are about to drop the `Tournaments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tournaments" DROP CONSTRAINT "Tournaments_casinoId_fkey";

-- DropTable
DROP TABLE "Tournaments";

-- CreateTable
CREATE TABLE "Tournament" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameStarted" BOOLEAN NOT NULL DEFAULT false,
    "casinoId" INTEGER NOT NULL,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_casinoId_fkey" FOREIGN KEY ("casinoId") REFERENCES "Casino"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
