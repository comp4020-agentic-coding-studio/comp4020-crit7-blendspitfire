CREATE TABLE `reviews` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`building_number` text NOT NULL,
	`author` text NOT NULL,
	`quietness` integer NOT NULL,
	`comfort` integer NOT NULL,
	`comment` text NOT NULL,
	`placeholder` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL
);
