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
	`averageTemperature` integer NOT NULL,
	`sideralOrbit` real NOT NULL,
	`sideralRotation` real NOT NULL,
	`alternativeName` text,
	`discoveryYear` integer,
	`discoveredBy` text,
	`imageUrl` text
);
--> statement-breakpoint
CREATE TABLE `body_relations` (
	`parentId` integer NOT NULL,
	`childId` integer NOT NULL,
	FOREIGN KEY (`parentId`) REFERENCES `bodies`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`childId`) REFERENCES `bodies`(`id`) ON UPDATE no action ON DELETE no action
);
