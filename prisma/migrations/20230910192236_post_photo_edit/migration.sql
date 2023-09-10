/*
  Warnings:

  - You are about to drop the `_PhotoToPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PhotoToPost" DROP CONSTRAINT "_PhotoToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_PhotoToPost" DROP CONSTRAINT "_PhotoToPost_B_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "photos" TEXT[];

-- DropTable
DROP TABLE "_PhotoToPost";
