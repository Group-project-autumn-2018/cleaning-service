--
-- set charset for database
--
SET CLIENT_ENCODING TO 'utf8';

TRUNCATE TABLE service_coefficient RESTART IDENTITY CASCADE;
--
-- insert data to companies
--
INSERT INTO service_coefficient (id, coefficient, company_service_id)
VALUES (1, 1, 1);
