/*
  Warnings:

  - You are about to drop the `Agent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Agent";

-- CreateTable
CREATE TABLE "agent" (
    "id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6),
    "ip_address" VARCHAR(255),
    "status" VARCHAR(255),
    "username" VARCHAR(255),

    CONSTRAINT "agent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ukq5ypy1ak6awk0m836khfdvspu" ON "agent"("ip_address");
