/*
  Warnings:

  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `car` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ride` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ridepassenger` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

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

-- DropTable
DROP TABLE `address`;

-- DropTable
DROP TABLE `car`;

-- DropTable
DROP TABLE `ride`;

-- DropTable
DROP TABLE `ridepassenger`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `students` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `enrollment_number` VARCHAR(20) NOT NULL,
    `course` VARCHAR(100) NULL,
    `gender` ENUM('MALE', 'FEMALE', 'OTHER') NULL,
    `age` INTEGER NULL,
    `phone_number` VARCHAR(20) NULL,
    `postal_code` VARCHAR(10) NULL,
    `avatar_url` VARCHAR(255) NULL,
    `is_admin` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `students_email_key`(`email`),
    UNIQUE INDEX `students_enrollment_number_key`(`enrollment_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` INTEGER NOT NULL,
    `brand` VARCHAR(50) NULL,
    `model` VARCHAR(50) NULL,
    `license_plate` VARCHAR(10) NOT NULL,
    `year` INTEGER NULL,
    `total_capacity` INTEGER NOT NULL,
    `car_image_url` VARCHAR(255) NULL,

    UNIQUE INDEX `vehicles_license_plate_key`(`license_plate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rides` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `driver_id` INTEGER NOT NULL,
    `vehicle_id` INTEGER NOT NULL,
    `origin` VARCHAR(255) NOT NULL,
    `destination` VARCHAR(255) NOT NULL,
    `total_distance` DECIMAL(6, 2) NULL,
    `suggested_price` DECIMAL(8, 2) NULL,
    `arrival_time` DATETIME(3) NOT NULL,
    `departure_time` DATETIME(3) NOT NULL,
    `available_seats` INTEGER NOT NULL,
    `status` ENUM('ACTIVE', 'FINISHED', 'CANCELLED') NOT NULL DEFAULT 'ACTIVE',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ride_passengers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ride_id` INTEGER NOT NULL,
    `passenger_id` INTEGER NOT NULL,
    `status` ENUM('PENDING', 'CONFIRMED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `requested_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ratings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ride_id` INTEGER NOT NULL,
    `rater_id` INTEGER NOT NULL,
    `rated_user_id` INTEGER NOT NULL,
    `stars` INTEGER NOT NULL,
    `comment` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rides` ADD CONSTRAINT `rides_driver_id_fkey` FOREIGN KEY (`driver_id`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rides` ADD CONSTRAINT `rides_vehicle_id_fkey` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ride_passengers` ADD CONSTRAINT `ride_passengers_ride_id_fkey` FOREIGN KEY (`ride_id`) REFERENCES `rides`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ride_passengers` ADD CONSTRAINT `ride_passengers_passenger_id_fkey` FOREIGN KEY (`passenger_id`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ratings` ADD CONSTRAINT `ratings_ride_id_fkey` FOREIGN KEY (`ride_id`) REFERENCES `rides`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ratings` ADD CONSTRAINT `ratings_rater_id_fkey` FOREIGN KEY (`rater_id`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ratings` ADD CONSTRAINT `ratings_rated_user_id_fkey` FOREIGN KEY (`rated_user_id`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
