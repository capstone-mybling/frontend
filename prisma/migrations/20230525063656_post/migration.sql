-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('ON_SALE', 'SOLD_OUT', 'NOT_FOR_SALE');

-- AlterTable
ALTER TABLE "PostComment" ADD COLUMN     "isSold" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "PostStatus" NOT NULL DEFAULT 'NOT_FOR_SALE';
