-- CreateEnum
CREATE TYPE "Type" AS ENUM ('PEINTURE', 'SCULPTURE', 'DESSIN', 'ASCII_ART');

-- CreateTable
CREATE TABLE "Artwork" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "year" INTEGER,
    "description" TEXT,
    "type" "Type" NOT NULL,

    CONSTRAINT "Artwork_pkey" PRIMARY KEY ("id")
);
