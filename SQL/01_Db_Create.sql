USE [master]

IF db_id('Legacy') IS NULl
  CREATE DATABASE [Legacy]
GO

USE [Legacy]
GO


DROP TABLE IF EXISTS [Carrier];
DROP TABLE IF EXISTS [Policy];
DROP TABLE IF EXISTS [Product];
DROP TABLE IF EXISTS [UserProfileCarriers];
DROP TABLE IF EXISTS [UserProfiles];
GO

CREATE TABLE [UserProfiles] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255),
  [FirebaseUserId] nvarchar(255),
  [UserType] nvarchar(255),
  [Weight] integer,
  [Age] integer,
  [IsDiabetic] bit,
  [IsSmoker] bit,
  [Medications] nvarchar(255)
)
GO

CREATE TABLE [Policy] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [UserId] integer NOT NULL,
  [ProductId] integer,
  [Price] integer,
  [ProductName] nvarchar(255),
  [ProductType] nvarchar(255),
  [Length] nvarchar(255),
  [BenefitAmount] integer
)
GO

CREATE TABLE [Product] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [CarrierId] integer NOT NULL,
  [UserId] integer NOT NULL,
  [ProductName] nvarchar(255),
  [ProductType] nvarchar(255),
  [Length] nvarchar(255),
  [BenefitAmount] integer
)
GO

CREATE TABLE [Carrier] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255),
  [PhoneNumber] nvarchar(255),
  [Address] nvarchar(255),
  [LogoUrl] nvarchar(255)
)
GO

CREATE TABLE [UserProfileCarriers] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [UserId] integer NOT NULL,
  [CarrierId] integer NOT NULL
)
GO



ALTER TABLE [Policy] ADD FOREIGN KEY ([ProductId]) REFERENCES [Product] ([Id]) ON DELETE SET NULL
GO

ALTER TABLE [Policy] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfiles] ([Id])
GO

ALTER TABLE [Product] ADD FOREIGN KEY ([CarrierId]) REFERENCES [Carrier] ([Id])
GO

ALTER TABLE [UserProfileCarriers] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfiles] ([Id])
GO

ALTER TABLE [UserProfileCarriers] ADD FOREIGN KEY ([CarrierId]) REFERENCES [Carrier] ([Id])
GO
