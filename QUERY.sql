
-- user table

CREATE TABLE `photogrm`.`photogrm_users` (
    `Id` INT NOT NULL AUTO_INCREMENT , 
    `Name` VARCHAR(128) NOT NULL , 
    `Email` VARCHAR(128) NOT NULL ,
    `PhoneNumber` VARCHAR(15) NOT NULL ,
    `IsVerify` BOOLEAN NOT NULL DEFAULT FALSE ,
    `Password` VARCHAR(256) NOT NULL ,
    PRIMARY KEY (`Id`)
    ) 
ENGINE = InnoDB; 

-- session table

CREATE TABLE `photogrm`.`photogrm_user_session` (
    `session_id` INT NOT NULL AUTO_INCREMENT , 
    `user_id` INT NOT NULL , 
    `start_time` VARCHAR(45) NOT NULL , 
    `end_time` VARCHAR(45) NOT NULL , 
    `ip_address` VARCHAR(45) NOT NULL , 
    `user_agent` VARCHAR(255) NOT NULL,
    'token' VARCHAR(128) NOT NULL,
    PRIMARY KEY (`session_id`) ) 
ENGINE = InnoDB; 

-- post table

CREATE TABLE `photogrm`.`photogrm_post` (
    `post_id` INT NOT NULL AUTO_INCREMENT ,
    `user_id` INT NOT NULL , 
    `post_text` TEXT NOT NULL ,
    `img_url`  VARCHAR(128) NOT NULL ,
    `post_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    PRIMARY KEY (`post_id`)
) ENGINE = InnoDB; 

-- post_likes table

CREATE TABLE `photogrm`.`post_likes` (
    `like_id` INT NOT NULL AUTO_INCREMENT ,
    `post_id` INT NOT NULL ,
    `user_id` INT NOT NULL ,
    `isLike`  BOOLEAN NOT NULL DEFAULT FALSE ,
    `like_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
     PRIMARY KEY (`like_id`)
) ENGINE = InnoDB; 

-- post_comments TABLE

CREATE TABLE `photogrm`.`post_comments` (
    `comment_id` INT NOT NULL AUTO_INCREMENT ,
    `post_id` INT NOT NULL ,
    `user_id` INT NOT NULL ,
    `comment_text` TEXT NOT NULL ,
    `comment_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
     PRIMARY KEY (`comment_id`)
) ENGINE = InnoDB; 

-- user messages table

CREATE TABLE `photogrm`.`user_messages` (
    `message_id` INT NOT NULL AUTO_INCREMENT ,
    `sender_id` INT NOT NULL ,
    `recipient_id` INT NOT NULL ,
    `message_text` TEXT NOT NULL ,
    `message_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    `is_read` BOOLEAN NOT NULL DEFAULT FALSE ,
     PRIMARY KEY (`message_id`)
) ENGINE = InnoDB; 


-- follow table

CREATE TABLE `photogrm`.`photogram_followers` (
    `Id` INT NOT NULL AUTO_INCREMENT , 
    `follower_id` INT NOT NULL ,
    `following_id` INT NOT NULL ,
    `follow_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
     PRIMARY KEY (`Id`)
) ENGINE = InnoDB; 


--profile table

CREATE TABLE `photogrm`.`photogram_profile` (
    `Id` INT NOT NULL AUTO_INCREMENT ,
    `User_Id`INT NOT NULL,
    `username` VARCHAR(255) NOT NULL ,
    `Email` VARCHAR(255) NOT NULL ,
    `full_name` VARCHAR(255) NOT NULL ,
    `bio` TEXT NOT NULL ,
    `profile_picture_url` VARCHAR(255) NOT NULL ,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    `last_login` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    PRIMARY KEY (`Id`)
) ENGINE = InnoDB; 


-- upload changes
ALTER TABLE `photogrm_post` CHANGE `img_url` `img_url` BLOB NOT NULL; 

--session alter

ALTER TABLE `photogrm_user_session` ADD `token` VARCHAR(256) NOT NULL AFTER `user_agent`; 


--conversation message

CREATE TABLE `photogrm`.`user_conversation`(
    `conversation_id` INT NULL AUTO_INCREMENT,
    `user1_id` INT NOT NULL,
    `user2_id` INT NOT NULL,
    PRIMARY KEY(`conversation_id`)
) ENGINE = InnoDB;


--message history

CREATE TABLE `photogrm`.`message_history`(
    `Id` INT NULL AUTO_INCREMENT,
    `conversation_id` INT NOT NULL,
    `sender_id` INT NOT NULL,
    `receiver_id` INT NOT NULL,
    `message` TEXT NOT NULL,
    `date_on` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `read` INT NOT NULL,
    PRIMARY KEY(`Id`)
) ENGINE = InnoDB;