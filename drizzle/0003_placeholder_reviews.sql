-- Invented sample reviews so the pages aren't empty before real ones arrive.
-- Every row has placeholder = 1; remove them all with
-- DELETE FROM reviews WHERE placeholder = 1 (in a new migration).
INSERT INTO `reviews` (`building_number`, `author`, `quietness`, `comfort`, `comment`, `placeholder`) VALUES
('15', 'Mei', 4, 4, 'Upper floors are properly quiet. Ground floor is where group work happens, so go up.', 1),
('15', 'Josh', 3, 3, 'Good at 11pm on a weeknight, just remember your card. Chairs get uncomfortable after two hours.', 1),
('43', 'Priya', 5, 4, 'Silent floor is actually silent. Plenty of power points near the windows.', 1),
('43', 'Tom', 4, 3, 'Fills up fast in exam weeks. Weekend mornings are empty.', 1),
('2', 'Aiko', 5, 5, 'Beautiful reading room, almost nobody here. Shame it shuts at 4.', 1),
('5', 'Liam', 4, 4, 'Law students are serious about quiet. You will feel judged for opening a chip packet.', 1),
('155', 'Sofia', 2, 4, 'Great seats and views, but between classes the corridors are loud.', 1),
('155', 'Daniel', 3, 5, 'Level 4 booths are the best seats on campus if you get there before 10.', 1),
('154', 'Hannah', 2, 3, 'Handy for an hour between classes. Not somewhere to do deep work.', 1),
('22', 'Ravi', 2, 2, 'Crowds pour out of the Tank every hour. Benches in the foyer only.', 1),
('24', 'Emily', 3, 2, 'Empty tutorial rooms if you check the doors, but you get kicked out when a class starts.', 1),
('108', 'Kenji', 3, 3, 'Labs are open to CS students. Fine at night, bit cold.', 1),
('145', 'Chloe', 4, 4, 'Hardly anyone knows about the study space on the ground floor.', 1),
('9', 'Noah', 5, 2, 'Silent, but you are clearly in someone''s office corridor. Felt like trespassing.', 1),
('130', 'Isla', 4, 3, 'Quiet tables near the entrance. Staff looked at me funny but nobody said anything.', 1),
('12', 'Oliver', 1, 2, 'Exam hall when it is an exam hall, empty cavern otherwise. Doors often locked.', 1);
