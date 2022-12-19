-- DropForeignKey
ALTER TABLE "Drawings" DROP CONSTRAINT "Drawings_projectDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "Files" DROP CONSTRAINT "Files_projectDetailsId_fkey";

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_projectDetailsId_fkey" FOREIGN KEY ("projectDetailsId") REFERENCES "ProjectDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Drawings" ADD CONSTRAINT "Drawings_projectDetailsId_fkey" FOREIGN KEY ("projectDetailsId") REFERENCES "ProjectDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;
