/*
  Warnings:

  - You are about to drop the `DefaultCode` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `language` on the `Submission` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "language",
ADD COLUMN     "language" TEXT NOT NULL;

-- DropTable
DROP TABLE "DefaultCode";

-- DropEnum
DROP TYPE "Language";
