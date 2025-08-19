/*
  Warnings:

  - You are about to drop the `ProductVariant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VariantOption` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."ProductVariant" DROP CONSTRAINT "ProductVariant_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."VariantOption" DROP CONSTRAINT "VariantOption_variantId_fkey";

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "public"."ProductVariant";

-- DropTable
DROP TABLE "public"."VariantOption";
