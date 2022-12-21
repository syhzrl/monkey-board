/*
  Warnings:

  - Added the required column `sceneVersion` to the `DrawingDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DrawingDetails" ADD COLUMN     "sceneVersion" INTEGER NOT NULL;
