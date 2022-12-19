/*
  Warnings:

  - Added the required column `name` to the `Boards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Drawings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Boards" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Drawings" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Files" ADD COLUMN     "name" TEXT NOT NULL;
