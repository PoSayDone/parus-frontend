-- CreateTable
CREATE TABLE "LandingPage" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL DEFAULT 'home',
    "data" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LandingPage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LandingPage_key_key" ON "LandingPage"("key");
