-- ALTER TABLE `user`
-- 	CHANGE COLUMN `created_at` `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER `email`,
-- 	CHANGE COLUMN `deleted` `deleted` BIT(1) NOT NULL DEFAULT b'0' AFTER `social_id`;

-- ALTER TABLE `user`
-- 	CHANGE COLUMN `deleted` `deleted` BIT(1) NULL DEFAULT b'0' AFTER `social_id`;

-- ALTER TABLE `user`
-- 	CHANGE COLUMN `email_verified` `email_verified` TINYINT(1) NULL DEFAULT '0' AFTER `challenges`;

ALTER TABLE `institution`
	CHANGE COLUMN `create_at` `create_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP AFTER `description`,
	CHANGE COLUMN `updted_at` `updted_at` TIMESTAMP NULL DEFAULT NULL AFTER `create_at`;

ALTER TABLE `circle`
	CHANGE COLUMN `created_at` `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP AFTER `code`;