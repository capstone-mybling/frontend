/*
  Warnings:

  - You are about to drop the column `address` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `contractId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `PostComment` table. All the data in the column will be lost.
  - The primary key for the `PostLike` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `postId` on the `PostLike` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hash]` on the table `Contract` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[address]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contractAddress]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorId` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromAddress` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hash` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toAddress` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contractAddress` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postAddress` to the `PostComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postAddress` to the `PostLike` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_contractId_fkey";

-- DropForeignKey
ALTER TABLE "PostComment" DROP CONSTRAINT "PostComment_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostLike" DROP CONSTRAINT "PostLike_postId_fkey";

-- DropIndex
DROP INDEX "Contract_address_key";

-- DropIndex
DROP INDEX "Post_contractId_key";

-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "address",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fromAddress" TEXT NOT NULL,
ADD COLUMN     "hash" TEXT NOT NULL,
ADD COLUMN     "toAddress" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "contractId",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "contractAddress" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PostComment" DROP COLUMN "postId",
ADD COLUMN     "postAddress" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PostLike" DROP CONSTRAINT "PostLike_pkey",
DROP COLUMN "postId",
ADD COLUMN     "postAddress" TEXT NOT NULL,
ADD CONSTRAINT "PostLike_pkey" PRIMARY KEY ("postAddress", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Contract_hash_key" ON "Contract"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "Post_address_key" ON "Post"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Post_contractAddress_key" ON "Post"("contractAddress");

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_contractAddress_fkey" FOREIGN KEY ("contractAddress") REFERENCES "Contract"("hash") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_postAddress_fkey" FOREIGN KEY ("postAddress") REFERENCES "Post"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostComment" ADD CONSTRAINT "PostComment_postAddress_fkey" FOREIGN KEY ("postAddress") REFERENCES "Post"("address") ON DELETE RESTRICT ON UPDATE CASCADE;
