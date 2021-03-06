USE [master]
GO

IF db_id('Bibliotech') IS NOT NULL
BEGIN
  ALTER DATABASE [Bibliotech] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
  DROP DATABASE [Bibliotech]
END
GO

CREATE DATABASE [Bibliotech]
GO

USE [Bibliotech]
GO

-----------------------------------------------------------------------------------------------

CREATE TABLE [UserProfile] (
  [Id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [FirebaseUserId] VARCHAR(255) NOT NULL,
  [Email] VARCHAR(255) NOT NULL,
  [DisplayName] VARCHAR(255) NOT NULL,
  [FirstName] VARCHAR(255) NOT NULL,
  [LastName] VARCHAR(255) NOT NULL,
  [ImageUrl] VARCHAR(255) NULL,
  [City] VARCHAR(255) NOT NULL,
  [State] VARCHAR(255) NOT NULL
CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)
GO

CREATE TABLE [UserFriend] (
  [Id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [UserId] INTEGER NOT NULL,
  [FriendId] INTEGER NOT NULL
)
GO

CREATE TABLE [Book] (
  [Id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [OwnerId] INTEGER NOT NULL,
  [Title] VARCHAR(255) NOT NULL,
  [Genre] VARCHAR(255) NOT NULL,
  [ThumbnailUrl] VARCHAR(255) NOT NULL,
  [Description] VARCHAR(255) NOT NULL,
  [AverageRating] decimal NOT NULL,
  [OnShelf] bit NOT NULL
)
GO

CREATE TABLE [Author] (
  [Id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [Name] VARCHAR(255) NOT NULL
)
GO

CREATE TABLE [BookAuthor] (
  [Id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [AuthorId] INTEGER NOT NULL,
  [BookId] INTEGER NOT NULL
)
GO

CREATE TABLE [Loan] (
  [Id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [BookId] INTEGER NOT NULL,
  [BorrowerId] INTEGER NOT NULL,
  [RequestDate] datetime NOT NULL,
  [ResponseDate] datetime NULL,
  [BorrowDate] datetime NULL,
  [DueDate] datetime NOT NULL,
  [ReturnDate] datetime NULL,
  [LoanStatusId] INTEGER NOT NULL
)
GO

CREATE TABLE [LoanStatus] (
  [Id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [Status] VARCHAR(255) NOT NULL
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