-- Rename and modify BlogPost columns
-- Since we're renaming columns that contain data, we need to:
-- 1. Add new columns with the correct names
-- 2. Copy data from old columns to new columns
-- 3. Drop old columns

-- Step 1: Add new columns
ALTER TABLE "BlogPost" ADD COLUMN "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "BlogPost" ADD COLUMN "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Step 2: Copy data from old columns to new columns (if any records exist)
UPDATE "BlogPost" SET "created_at" = "createdAt" WHERE "createdAt" IS NOT NULL;
UPDATE "BlogPost" SET "updated_at" = "updatedAt" WHERE "updatedAt" IS NOT NULL;

-- Step 3: Drop old columns
ALTER TABLE "BlogPost" DROP COLUMN "createdAt";
ALTER TABLE "BlogPost" DROP COLUMN "updatedAt";

-- Step 4: Add the @updatedAt functionality
-- This is handled by Prisma at the application level, so we don't need to do anything special here
-- Prisma will automatically update the updated_at field when records are modified