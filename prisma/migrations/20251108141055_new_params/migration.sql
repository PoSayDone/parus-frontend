-- AlterTable
ALTER TABLE "public"."PricePlan" ADD COLUMN     "included" TEXT[];

-- AlterTable
ALTER TABLE "public"."Service" ADD COLUMN     "images" TEXT[],
ADD COLUMN     "thumbnail" TEXT;
