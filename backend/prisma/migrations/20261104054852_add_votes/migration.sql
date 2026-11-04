-- CreateTable
CREATE TABLE "votes" (
    "id" TEXT NOT NULL,
    "groupMemberId" TEXT NOT NULL,
    "destinationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "votes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "votes_groupMemberId_key" ON "votes"("groupMemberId");

-- CreateIndex
CREATE INDEX "votes_destinationId_idx" ON "votes"("destinationId");

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_groupMemberId_fkey" FOREIGN KEY ("groupMemberId") REFERENCES "group_members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "destinations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
