-- CreateTable
CREATE TABLE "FileDetails" (
    "id" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,

    CONSTRAINT "FileDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FileDetails_fileId_key" ON "FileDetails"("fileId");

-- AddForeignKey
ALTER TABLE "FileDetails" ADD CONSTRAINT "FileDetails_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "Files"("id") ON DELETE CASCADE ON UPDATE CASCADE;
