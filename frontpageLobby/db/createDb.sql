
drop database if exists frontpage_lobby;

create database frontpage_lobby;
 
use frontpage_lobby;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50),
  `token` varchar(50),
  `password` varchar(50),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` int NOT NULL,
  `content` varchar(255),
  `time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user) REFERENCES user(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
