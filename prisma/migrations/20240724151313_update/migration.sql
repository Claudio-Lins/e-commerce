/*
  Warnings:

  - You are about to drop the column `coverUrl` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Ingredient` table. All the data in the column will be lost.
  - Made the column `color` on table `Ingredient` required. This step will fail if there are existing NULL values in that column.
  - Made the column `harmonization` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `discount` on table `ProductDetail` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "coverUrl",
ADD COLUMN     "categoryImageUrl" TEXT;

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "imageUrl",
ADD COLUMN     "ingredientImageUrl" TEXT,
ALTER COLUMN "color" SET NOT NULL,
ALTER COLUMN "color" SET DEFAULT '#000000';

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "harmonization" SET NOT NULL,
ALTER COLUMN "harmonization" SET DEFAULT '';

-- AlterTable
ALTER TABLE "ProductDetail" ALTER COLUMN "discount" SET NOT NULL;
