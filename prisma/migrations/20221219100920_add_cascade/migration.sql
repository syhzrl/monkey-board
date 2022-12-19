-- DropForeignKey
ALTER TABLE "Boards" DROP CONSTRAINT "Boards_projectDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectDetails" DROP CONSTRAINT "ProjectDetails_projectId_fkey";

-- AddForeignKey
ALTER TABLE "ProjectDetails" ADD CONSTRAINT "ProjectDetails_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Boards" ADD CONSTRAINT "Boards_projectDetailsId_fkey" FOREIGN KEY ("projectDetailsId") REFERENCES "ProjectDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;
