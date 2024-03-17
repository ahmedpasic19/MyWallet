-- AlterTable
ALTER TABLE `WalletAccounts` ADD COLUMN `initialAmount` DOUBLE NULL,
    ADD COLUMN `note` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Goal` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `note` VARCHAR(191) NULL,
    `target` DOUBLE NOT NULL,
    `initialAmount` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
