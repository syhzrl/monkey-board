-- CreateTable
CREATE TABLE "DrawingDetails" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "drawingId" TEXT NOT NULL,

    CONSTRAINT "DrawingDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DrawingDetails_drawingId_key" ON "DrawingDetails"("drawingId");

-- AddForeignKey
ALTER TABLE "DrawingDetails" ADD CONSTRAINT "DrawingDetails_drawingId_fkey" FOREIGN KEY ("drawingId") REFERENCES "Drawings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
