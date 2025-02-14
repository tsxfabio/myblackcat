/*
  Warnings:

  - You are about to drop the column `createdAt` on the `adoptions` table. All the data in the column will be lost.
  - You are about to drop the column `petId` on the `adoptions` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `adoptions` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `adoptions` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `adoptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_of_birth` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "adoptions" DROP COLUMN "createdAt",
DROP COLUMN "petId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "createdAt",
DROP COLUMN "dateOfBirth",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date_of_birth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
