/*
  Warnings:

  - You are about to drop the column `isPublic` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `isPublished` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `photos` on the `Record` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Record" DROP COLUMN "isPublic",
DROP COLUMN "isPublished",
DROP COLUMN "photos";

-- CreateTable
CREATE TABLE "_PhotoToRecord" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PhotoToRecord_AB_unique" ON "_PhotoToRecord"("A", "B");

-- CreateIndex
CREATE INDEX "_PhotoToRecord_B_index" ON "_PhotoToRecord"("B");

-- AddForeignKey
ALTER TABLE "_PhotoToRecord" ADD CONSTRAINT "_PhotoToRecord_A_fkey" FOREIGN KEY ("A") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PhotoToRecord" ADD CONSTRAINT "_PhotoToRecord_B_fkey" FOREIGN KEY ("B") REFERENCES "Record"("id") ON DELETE CASCADE ON UPDATE CASCADE;
