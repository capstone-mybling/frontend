/*
  Warnings:

  - You are about to drop the column `isSold` on the `PostComment` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `PostComment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "isSold" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "PostStatus" NOT NULL DEFAULT 'NOT_FOR_SALE';

-- AlterTable
ALTER TABLE "PostComment" DROP COLUMN "isSold",
DROP COLUMN "status";
