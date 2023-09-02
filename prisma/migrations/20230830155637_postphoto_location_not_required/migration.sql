/*
  Warnings:

  - You are about to drop the column `postId` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_postId_fkey";

-- AlterTable
ALTER TABLE "Land" ALTER COLUMN "location" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "postId",
ALTER COLUMN "location" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name";

-- CreateTable
CREATE TABLE "_PhotoToPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PhotoToPost_AB_unique" ON "_PhotoToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_PhotoToPost_B_index" ON "_PhotoToPost"("B");

-- AddForeignKey
ALTER TABLE "_PhotoToPost" ADD CONSTRAINT "_PhotoToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PhotoToPost" ADD CONSTRAINT "_PhotoToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
