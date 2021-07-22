USE [master]
GO

IF db_id('bibliotech') IS NOT NULL
BEGIN
  ALTER DATABASE [bibliotech] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
  DROP DATABASE [bibliotech]
END
GO

CREATE DATABASE [bibliotech]
GO

USE [bibliotech]
GO

-----------------------------------------------------------------------------------------------

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY NOT NULL,
  [FirebaseUserId] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [DisplayName] nvarchar(255) NOT NULL,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [ImageUrl] nvarchar(255) NULL,
  [City] nvarchar(255) NOT NULL,
  [State] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [UserFriend] (
  [Id] int PRIMARY KEY NOT NULL,
  [UserId] int NOT NULL,
  [FriendId] int NOT NULL
)
GO

CREATE TABLE [Book] (
  [Id] int PRIMARY KEY NOT NULL,
  [OwnerId] int NOT NULL,
  [Title] nvarchar(255) NOT NULL,
  [Genre] nvarchar(255) NOT NULL,
  [ThumbnailUrl] nvarchar(255) NOT NULL,
  [Description] nvarchar(255) NOT NULL,
  [AverageRating] decimal NOT NULL,
  [OnShelf] bit NOT NULL
)
GO

CREATE TABLE [Author] (
  [Id] int PRIMARY KEY NOT NULL,
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [BookAuthor] (
  [Id] int PRIMARY KEY NOT NULL,
  [AuthorId] int NOT NULL,
  [BookId] int NOT NULL
)
GO

CREATE TABLE [Loan] (
  [Id] int PRIMARY KEY NOT NULL,
  [BookId] int NOT NULL,
  [BorrowerId] int NOT NULL,
  [RequestDate] datetime NOT NULL,
  [ResponseDate] datetime NULL,
  [BorrowDate] datetime NULL,
  [DueDate] datetime NOT NULL,
  [ReturnDate] datetime NULL,
  [LoanStatusId] int NOT NULL
)
GO

CREATE TABLE [LoanStatus] (
  [Id] int PRIMARY KEY NOT NULL,
  [Status] nvarchar(255) NOT NULL
)
GO

ALTER TABLE [Book] ADD FOREIGN KEY ([OwnerId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Loan] ADD FOREIGN KEY ([BookId]) REFERENCES [Book] ([Id])
GO

ALTER TABLE [BookAuthor] ADD FOREIGN KEY ([AuthorId]) REFERENCES [Author] ([Id])
GO

ALTER TABLE [UserFriend] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [UserFriend] ADD FOREIGN KEY ([FriendId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Loan] ADD FOREIGN KEY ([BorrowerId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Loan] ADD FOREIGN KEY ([LoanStatusId]) REFERENCES [LoanStatus] ([Id])
GO

ALTER TABLE [BookAuthor] ADD FOREIGN KEY ([BookId]) REFERENCES [Book] ([Id])
GO

--------------------------------------------------------------------------------------