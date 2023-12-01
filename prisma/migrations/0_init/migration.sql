-- CreateTable
CREATE TABLE `category` (
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(45) NULL,

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clothing_size` (
    `clothing_size_id` INTEGER NOT NULL AUTO_INCREMENT,
    `clothing_size` VARCHAR(45) NULL,

    PRIMARY KEY (`clothing_size_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `order_id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_date` DATE NULL,
    `user_id` INTEGER NULL,

    INDEX `fk_order_user_idx`(`user_id`),
    PRIMARY KEY (`order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_order_xref` (
    `product_id` INTEGER NOT NULL,
    `order_id` INTEGER NOT NULL,
    `quantity` INTEGER NULL,
    `clothing_size_id` INTEGER NULL,

    INDEX `fk_productorder_clothingsize_idx`(`clothing_size_id`),
    INDEX `fk_productorder_order_idx`(`order_id`),
    PRIMARY KEY (`product_id`, `order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `product_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_name` VARCHAR(45) NOT NULL,
    `category_id` INTEGER NULL,
    `clothing_size_id` INTEGER NULL,
    `quantity_left` INTEGER NULL,

    INDEX `fk_product_category_idx`(`category_id`),
    PRIMARY KEY (`product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(45) NOT NULL,
    `last_name` VARCHAR(45) NOT NULL,
    `company_name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `fk_order_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product_order_xref` ADD CONSTRAINT `fk_productorder_clothingsize` FOREIGN KEY (`clothing_size_id`) REFERENCES `clothing_size`(`clothing_size_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product_order_xref` ADD CONSTRAINT `fk_productorder_order` FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product_order_xref` ADD CONSTRAINT `fk_productorder_product` FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `fk_product_category` FOREIGN KEY (`category_id`) REFERENCES `category`(`category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

