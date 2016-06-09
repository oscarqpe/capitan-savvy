SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';

CREATE SCHEMA IF NOT EXISTS `edutic_now` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci ;
USE `edutic_now` ;

-- -----------------------------------------------------
-- Table `edutic_now`.`rol`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `edutic_now`.`rol` (
  `id_rol` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(255) NOT NULL ,
  `description` VARCHAR(255) NULL ,
  PRIMARY KEY (`id_rol`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `edutic_now`.`institution`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `edutic_now`.`institution` (
  `id_institution` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(255) NOT NULL ,
  `country` VARCHAR(255) NULL ,
  `region` VARCHAR(255) NULL ,
  `city` VARCHAR(255) NULL ,
  `telephone` VARCHAR(255) NULL ,
  `email` VARCHAR(255) NULL ,
  `website` VARCHAR(255) NULL ,
  `description` VARCHAR(255) NULL ,
  `create_at` TIMESTAMP NULL ,
  `updted_at` TIMESTAMP NULL ,
  PRIMARY KEY (`id_institution`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `edutic_now`.`circle`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `edutic_now`.`circle` (
  `id_circle` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(255) NOT NULL ,
  `type` INT NULL DEFAULT 0 ,
  `code` VARCHAR(255) NULL ,
  `created_at` TIMESTAMP NULL ,
  `updated_at` TIMESTAMP NULL ,
  `fk_id_institution` INT NOT NULL ,
  PRIMARY KEY (`id_circle`) ,
  INDEX `fk_circle_institution1` (`fk_id_institution` ASC) ,
  CONSTRAINT `fk_circle_institution1`
    FOREIGN KEY (`fk_id_institution` )
    REFERENCES `edutic_now`.`institution` (`id_institution` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `edutic_now`.`unit`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `edutic_now`.`unit` (
  `id_unit` INT NOT NULL AUTO_INCREMENT ,
  `fk_id_circle` INT NOT NULL ,
  `title` VARCHAR(255) NOT NULL ,
  `description` VARCHAR(255) NULL ,
  `url_cover` VARCHAR(255) NOT NULL ,
  `url_background` VARCHAR(255) NULL ,
  `type` INT NOT NULL DEFAULT 0 ,
  `color` VARCHAR(255) NULL ,
  `created_at` TIMESTAMP NULL ,
  `update_at` TIMESTAMP NULL ,
  PRIMARY KEY (`id_unit`) ,
  INDEX `fk_unit_circle1` (`fk_id_circle` ASC) ,
  CONSTRAINT `fk_unit_circle1`
    FOREIGN KEY (`fk_id_circle` )
    REFERENCES `edutic_now`.`circle` (`id_circle` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `edutic_now`.`section`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `edutic_now`.`section` (
  `id_section` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(255) NOT NULL ,
  `created_at` TIMESTAMP NULL ,
  `updated_at` TIMESTAMP NULL ,
  `fk_id_unit` INT NOT NULL ,
  PRIMARY KEY (`id_section`) ,
  INDEX `fk_section_unit1` (`fk_id_unit` ASC) ,
  CONSTRAINT `fk_section_unit1`
    FOREIGN KEY (`fk_id_unit` )
    REFERENCES `edutic_now`.`unit` (`id_unit` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `edutic_now`.`page`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `edutic_now`.`page` (
  `id_page` INT NOT NULL AUTO_INCREMENT ,
  `title` VARCHAR(255) NOT NULL ,
  `description` VARCHAR(255) NOT NULL ,
  `content` TEXT NOT NULL ,
  `url_img` VARCHAR(255) NOT NULL ,
  `created_at` TIMESTAMP NULL ,
  `updated_at` TIMESTAMP NULL ,
  `fk_id_section` INT NOT NULL ,
  PRIMARY KEY (`id_page`) ,
  INDEX `fk_page_section1` (`fk_id_section` ASC) ,
  CONSTRAINT `fk_page_section1`
    FOREIGN KEY (`fk_id_section` )
    REFERENCES `edutic_now`.`section` (`id_section` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
