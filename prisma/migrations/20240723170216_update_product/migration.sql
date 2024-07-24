/*
  Warnings:

  - You are about to drop the column `currency` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `net` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `qunatityInStock` on the `ProductDetail` table. All the data in the column will be lost.
  - Added the required column `quantityInStock` to the `ProductDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "currency",
DROP COLUMN "discount",
DROP COLUMN "net";

-- AlterTable
ALTER TABLE "ProductDetail" DROP COLUMN "qunatityInStock",
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'EUR',
ADD COLUMN     "quantityInStock" INTEGER NOT NULL;
