-- AlterTable
ALTER TABLE "public"."Address" ADD COLUMN "cemeteryImages" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "public"."Address" ADD COLUMN "cemeteryThumbnail" TEXT;
