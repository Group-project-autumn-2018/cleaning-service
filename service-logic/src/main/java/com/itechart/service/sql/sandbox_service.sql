--
-- set charset for database
--
SET CLIENT_ENCODING TO 'utf8';

TRUNCATE TABLE company_service RESTART IDENTITY CASCADE;
--
-- insert data to companies
--
INSERT INTO company_service (id, company_id, name, description, price_per_m2_$, time_per_m2_minute)
VALUES
  (1, 1, 'Standard room cleaning', 'bla bla bla', 1, 5),
  (2, 1, 'Spring-cleaning', 'bla bla bla', 1, 5),
  (3, 1, 'Cleaning after repair and construction', 'bla bla bla', 1, 5),
  (4, 1, 'Dry carpet cleaning', 'bla bla bla', 1, 5),
  (5, 2, 'Office cleaning', 'bla bla bla', 1, 6),
  (6, 2, 'Dry cleaning of furniture and coatings', 'bla bla bla', 1, 6),
  (7, 2, 'Industrial cleaning', 'bla bla bla', 1, 6),
  (8, 2, 'Pool cleaning', 'bla bla bla', 1, 6),
  (9, 3, 'Standard room cleaning', 'bla bla bla', 1, 5),
  (10, 3, 'Spring-cleaning', 'bla bla bla', 1, 5),
  (11, 3, 'Cleaning after repair and construction', 'bla bla bla', 1, 5),
  (12, 3, 'Dry carpet cleaning', 'bla bla bla', 1, 5),
  (13, 4, 'Office cleaning', 'bla bla bla', 1, 6),
  (14, 4, 'Dry cleaning of furniture and coatings', 'bla bla bla', 1, 6),
  (15, 4, 'Industrial cleaning', 'bla bla bla', 1, 6),
  (16, 4, 'Pool cleaning', 'bla bla bla', 1, 6),
  (17, 5, 'Standard room cleaning', 'bla bla bla', 1, 5),
  (18, 5, 'Spring-cleaning', 'bla bla bla', 1, 5),
  (19, 5, 'Cleaning after repair and construction', 'bla bla bla', 1, 5),
  (20, 5, 'Dry carpet cleaning', 'bla bla bla', 1, 5),
  (21, 6, 'Office cleaning', 'bla bla bla', 1, 6),
  (22, 6, 'Dry cleaning of furniture and coatings', 'bla bla bla', 1, 6),
  (23, 6, 'Industrial cleaning', 'bla bla bla', 1, 6),
  (24, 6, 'Pool cleaning', 'bla bla bla', 1, 6),
  (25, 7, 'Standard room cleaning', 'bla bla bla', 1, 5),
  (26, 7, 'Spring-cleaning', 'bla bla bla', 1, 5),
  (27, 7, 'Cleaning after repair and construction', 'bla bla bla', 1, 5),
  (28, 7, 'Dry carpet cleaning', 'bla bla bla', 1, 5),
  (29, 8, 'Office cleaning', 'bla bla bla', 1, 6),
  (30, 8, 'Dry cleaning of furniture and coatings', 'bla bla bla', 1, 6),
  (31, 8, 'Industrial cleaning', 'bla bla bla', 1, 6),
  (32, 8, 'Pool cleaning', 'bla bla bla', 1, 6),
  (33, 9, 'Standard room cleaning', 'bla bla bla', 1, 5),
  (34, 9, 'Spring-cleaning', 'bla bla bla', 1, 5),
  (35, 9, 'Cleaning after repair and construction', 'bla bla bla', 1, 5),
  (36, 9, 'Dry carpet cleaning', 'bla bla bla', 1, 5),
  (37, 10, 'Office cleaning', 'bla bla bla', 1, 6),
  (38, 10, 'Dry cleaning of furniture and coatings', 'bla bla bla', 1, 6),
  (39, 10, 'Industrial cleaning', 'bla bla bla', 1, 6),
  (40, 10, 'Pool cleaning', 'bla bla bla', 1, 6);