delete l
FROM Loan l
Inner Join Book b on b.Id = l.BookId
where b.IsDeleted = 1

delete Book where IsDeleted = 1

select * from UserProfile

delete UserProfile where FirstName = 'Testy'


https://static01.nyt.com/images/2016/03/22/nytnow/22xp-boaty/22xp-boaty-superJumbo.jpg