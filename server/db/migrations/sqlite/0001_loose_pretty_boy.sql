CREATE TABLE `bodies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`meanRadius` integer NOT NULL,
	`massValue` real,
	`massExponent` integer,
	`volumeValue` real,
	`volumeExponent` integer,
	`density` real NOT NULL,
	`gravity` real NOT NULL,
	`averageTemperatureK` integer NOT NULL,
	`sideralOrbit` real NOT NULL,
	`sideralRotation` real NOT NULL,
	`alternativeName` text,
	`discoveryDate` integer,
	`discoveredBy` text,
	`imageUrl` text
);
--> statement-breakpoint
CREATE TABLE `body_relations` (
	`parent_id` text NOT NULL,
	`child_id` text NOT NULL,
	FOREIGN KEY (`parent_id`) REFERENCES `bodies`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`child_id`) REFERENCES `bodies`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP TABLE `planets`;