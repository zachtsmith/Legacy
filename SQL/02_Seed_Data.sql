set identity_insert [UserType] on
insert into [UserType] ([ID], [Name]) VALUES (1, 'Broker'), (2, 'Client');
set identity_insert [UserType] off
