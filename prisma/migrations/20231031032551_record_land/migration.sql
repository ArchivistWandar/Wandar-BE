-- AlterTable
ALTER TABLE "Land" ADD COLUMN     "recordId" INTEGER;

-- AddForeignKey
ALTER TABLE "Land" ADD CONSTRAINT "Land_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE SET NULL ON UPDATE CASCADE;
