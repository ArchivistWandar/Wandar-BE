/*
  Warnings:

  - You are about to drop the `_PhotoToRecord` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[senderId,recieverId]` on the table `FriendRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_PhotoToRecord" DROP CONSTRAINT "_PhotoToRecord_A_fkey";

-- DropForeignKey
ALTER TABLE "_PhotoToRecord" DROP CONSTRAINT "_PhotoToRecord_B_fkey";

-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "recordId" INTEGER,
ALTER COLUMN "postId" DROP NOT NULL;

-- DropTable
DROP TABLE "_PhotoToRecord";

-- CreateIndex
CREATE UNIQUE INDEX "FriendRequest_senderId_recieverId_key" ON "FriendRequest"("senderId", "recieverId");

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE SET NULL ON UPDATE CASCADE;
