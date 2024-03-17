/*
  Warnings:

  - You are about to drop the column `userId` on the `WalletAccounts` table. All the data in the column will be lost.
  - Added the required column `name` to the `WalletAccounts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `WalletAccounts` DROP FOREIGN KEY `WalletAccounts_userId_fkey`;

-- AlterTable
ALTER TABLE `WalletAccounts` DROP COLUMN `userId`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
