-- AlterTable
UPDATE "public"."Address"
SET "phone" = ARRAY[]::TEXT[]
WHERE "phone" IS NULL;

ALTER TABLE "public"."Address"
ALTER COLUMN "phone" TYPE TEXT[]
USING CASE
	WHEN "phone" IS NULL THEN ARRAY[]::TEXT[]
	ELSE ARRAY["phone"]
END;

ALTER TABLE "public"."Address"
ALTER COLUMN "phone" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "phone" SET NOT NULL;
