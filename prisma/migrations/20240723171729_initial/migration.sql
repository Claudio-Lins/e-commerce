/*
  Warnings:

  - You are about to drop the column `cor` on the `Ingredient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "cor",
ADD COLUMN     "color" TEXT;
