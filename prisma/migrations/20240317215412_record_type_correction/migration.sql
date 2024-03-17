/*
  Warnings:

  - The values [EXPENCE] on the enum `Record_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Record` MODIFY `type` ENUM('EXPENSE', 'INCOME') NOT NULL;
