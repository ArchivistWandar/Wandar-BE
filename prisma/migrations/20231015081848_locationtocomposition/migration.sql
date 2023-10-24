/*
  Warnings:

  - You are about to drop the column `location` on the `Land` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Land" DROP COLUMN "location",
ADD COLUMN     "composition" TEXT;
