/*
  Warnings:

  - Added the required column `count` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "count" INTEGER NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Storage" ADD COLUMN     "contractAddress" TEXT;

-- AddForeignKey
ALTER TABLE "Storage" ADD CONSTRAINT "Storage_contractAddress_fkey" FOREIGN KEY ("contractAddress") REFERENCES "Contract"("hash") ON DELETE SET NULL ON UPDATE CASCADE;
