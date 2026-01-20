-- AlterTable
ALTER TABLE "public"."Address" DROP COLUMN "location";
ALTER TABLE "public"."Address" ADD COLUMN "handle" TEXT;
ALTER TABLE "public"."Address" ADD COLUMN "description" TEXT;
ALTER TABLE "public"."Address" ADD COLUMN "cemeteryStatus" TEXT;
ALTER TABLE "public"."Address" ADD COLUMN "cemeteryDocuments" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "public"."Address" ADD COLUMN "cemeteryNote" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Address_handle_key" ON "public"."Address"("handle");
