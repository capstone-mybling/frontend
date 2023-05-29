-- CreateTable
CREATE TABLE "Transfer" (
    "id" SERIAL NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "method" TEXT NOT NULL DEFAULT 'mint',
    "fromAddress" TEXT NOT NULL,
    "toAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transfer_pkey" PRIMARY KEY ("id")
);
