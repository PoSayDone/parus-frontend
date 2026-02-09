-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "metaDescription" TEXT,
ADD COLUMN     "metaTitle" TEXT;

-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "seoDescription" TEXT;

-- AlterTable
ALTER TABLE "SiteSettings" ADD COLUMN     "addressesMetaDescription" TEXT,
ADD COLUMN     "addressesMetaTitle" TEXT,
ADD COLUMN     "blogMetaDescription" TEXT,
ADD COLUMN     "blogMetaTitle" TEXT,
ADD COLUMN     "landingMetaDescription" TEXT,
ADD COLUMN     "landingMetaTitle" TEXT,
ADD COLUMN     "pricesMetaDescription" TEXT,
ADD COLUMN     "pricesMetaTitle" TEXT;
