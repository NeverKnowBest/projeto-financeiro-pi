/*
  Warnings:

  - The primary key for the `address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `car` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ride` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ridepassenger` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `admin` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `Address_userId_fkey`;

-- DropForeignKey
ALTER TABLE `car` DROP FOREIGN KEY `Car_userId_fkey`;

-- DropForeignKey
ALTER TABLE `ride` DROP FOREIGN KEY `Ride_carId_fkey`;

-- DropForeignKey
ALTER TABLE `ride` DROP FOREIGN KEY `Ride_driverId_fkey`;

-- DropForeignKey
ALTER TABLE `ridepassenger` DROP FOREIGN KEY `RidePassenger_passengerId_fkey`;

-- DropForeignKey
ALTER TABLE `ridepassenger` DROP FOREIGN KEY `RidePassenger_rideId_fkey`;

-- AlterTable
ALTER TABLE `address` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `userId` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `car` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `userId` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `ride` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `driverId` BIGINT NOT NULL,
    MODIFY `carId` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `ridepassenger` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `rideId` BIGINT NOT NULL,
    MODIFY `passengerId` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    ADD COLUMN `admin` BOOLEAN NOT NULL,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ride` ADD CONSTRAINT `Ride_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ride` ADD CONSTRAINT `Ride_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RidePassenger` ADD CONSTRAINT `RidePassenger_rideId_fkey` FOREIGN KEY (`rideId`) REFERENCES `Ride`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RidePassenger` ADD CONSTRAINT `RidePassenger_passengerId_fkey` FOREIGN KEY (`passengerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
