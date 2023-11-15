-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_landId_fkey";

-- AlterTable
ALTER TABLE "Photo" ALTER COLUMN "landId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_landId_fkey" FOREIGN KEY ("landId") REFERENCES "Land"("id") ON DELETE SET NULL ON UPDATE CASCADE;
