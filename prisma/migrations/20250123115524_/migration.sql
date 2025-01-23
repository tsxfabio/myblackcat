/*
  Warnings:

  - Added the required column `pet_id` to the `adoptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `adoptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "adoptions" ADD COLUMN     "pet_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "adoptions" ADD CONSTRAINT "adoptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoptions" ADD CONSTRAINT "adoptions_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
