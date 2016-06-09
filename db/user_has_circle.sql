CREATE TABLE `user_has_circle` (
  `id_user_circle` int(11) NOT NULL AUTO_INCREMENT,
  `fk_id_user` int(11) NOT NULL,
  `fk_id_circle` int(11) NOT NULL,
  PRIMARY KEY (`id_user_circle`),
  KEY `fk_user_has_circle_circle1` (`fk_id_circle`),
  KEY `fk_user_has_circle_user1` (`fk_id_user`),
  CONSTRAINT `fk_user_has_circle_circle1` FOREIGN KEY (`fk_id_circle`) REFERENCES `circle` (`id_circle`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_circle_user1` FOREIGN KEY (`fk_id_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- CREATE TABLE `user_has_circle` (
-- 	`id_user_circle` INT(11) NOT NULL AUTO_INCREMENT,
-- 	`fk_id_user` INT(11) NOT NULL,
-- 	`fk_id_circle` INT(11) NOT NULL,
-- 	PRIMARY KEY (`id_user_circle`),
-- 	INDEX `fk_user_has_circle_circle1` (`fk_id_circle`),
-- 	INDEX `fk_user_has_circle_user1` (`fk_id_user`),
-- 	CONSTRAINT `fk_user_has_circle_user1` FOREIGN KEY (`fk_id_user`) REFERENCES `user` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION,
-- 	CONSTRAINT `fk_user_has_circle_circle1` FOREIGN KEY (`fk_id_circle`) REFERENCES `circle` (`id_circle`) ON UPDATE NO ACTION ON DELETE NO ACTION
-- )
-- COLLATE='latin1_swedish_ci'
-- ENGINE=InnoDB
-- ;