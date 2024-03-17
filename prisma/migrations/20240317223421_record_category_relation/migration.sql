-- AlterTable
ALTER TABLE `Record` ADD COLUMN `categoryId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Record` ADD CONSTRAINT `Record_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
