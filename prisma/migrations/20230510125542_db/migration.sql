/*
  Warnings:

  - You are about to drop the column `authorId` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `PostComment` table. All the data in the column will be lost.
  - The primary key for the `PostCommentLike` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `PostCommentLike` table. All the data in the column will be lost.
  - Added the required column `authorAddress` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorAddress` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorAddress` to the `PostComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAddress` to the `PostCommentLike` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Contract" DROP CONSTRAINT "Contract_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "PostComment" DROP CONSTRAINT "PostComment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "PostCommentLike" DROP CONSTRAINT "PostCommentLike_userId_fkey";

-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "authorId",
ADD COLUMN     "authorAddress" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "authorId",
ADD COLUMN     "authorAddress" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PostComment" DROP COLUMN "authorId",
ADD COLUMN     "authorAddress" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PostCommentLike" DROP CONSTRAINT "PostCommentLike_pkey",
DROP COLUMN "userId",
ADD COLUMN     "userAddress" TEXT NOT NULL,
ADD CONSTRAINT "PostCommentLike_pkey" PRIMARY KEY ("commentId", "userAddress");

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_authorAddress_fkey" FOREIGN KEY ("authorAddress") REFERENCES "User"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorAddress_fkey" FOREIGN KEY ("authorAddress") REFERENCES "User"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostComment" ADD CONSTRAINT "PostComment_authorAddress_fkey" FOREIGN KEY ("authorAddress") REFERENCES "User"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostCommentLike" ADD CONSTRAINT "PostCommentLike_userAddress_fkey" FOREIGN KEY ("userAddress") REFERENCES "User"("address") ON DELETE RESTRICT ON UPDATE CASCADE;
