CREATE DATABASE client_details;
CREATE TABLE IF NOT EXISTS `clients` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `position` varchar(255) NOT NULL,
    `company` varchar(255) NOT NULL,
    `address` varchar(255) NOT NULL,
    `phone` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `image` varchar(255) NOT NULL,
    `createdAt` varchar(20) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;