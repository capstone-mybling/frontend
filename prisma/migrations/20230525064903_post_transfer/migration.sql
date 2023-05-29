/*
  Warnings:

  - Added the required column `postAddress` to the `Transfer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transfer" ADD COLUMN     "postAddress" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_postAddress_fkey" FOREIGN KEY ("postAddress") REFERENCES "Post"("address") ON DELETE RESTRICT ON UPDATE CASCADE;
