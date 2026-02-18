/*
  Warnings:

  - You are about to drop the column `enrollment_number` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `postal_code` on the `students` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ra]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ra` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `students_enrollment_number_key` ON `students`;

-- AlterTable
ALTER TABLE `students` DROP COLUMN `enrollment_number`,
    DROP COLUMN `postal_code`,
    ADD COLUMN `cep` VARCHAR(10) NULL,
    ADD COLUMN `ra` VARCHAR(20) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `students_ra_key` ON `students`(`ra`);
