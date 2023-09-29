/*
  Warnings:

  - You are about to drop the column `photos` on the `Post` table. All the data in the column will be lost.
  - Added the required column `postId` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theme` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "postId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "photos",
ADD COLUMN     "title" TEXT NOT NULL DEFAULT 'No title';

-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "photos" TEXT[],
ADD COLUMN     "theme" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
