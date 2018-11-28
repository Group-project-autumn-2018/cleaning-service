--liquibase formatted sql

--changeset eitarg:1543438531253-1
CREATE TABLE cleaning_time (
  id                                    BIGSERIAL NOT NULL,
  bathroom_cleaning_time                INTEGER,
  big_room_cleaning_time                INTEGER,
  dry_carpet_cleaning_time              FLOAT8,
  furniture_and_coatings_cleaning_time  FLOAT8,
  industrial_cleaning_time              FLOAT8,
  office_cleaning_time                  FLOAT8,
  pool_cleaning_time                    FLOAT8,
  repair_and_construction_cleaning_time FLOAT8,
  small_room_cleaning_time              INTEGER,
  spring_cleaning_time                  FLOAT8,
  standard_room_cleaning_time           FLOAT8,
  CONSTRAINT cleaning_time_pkey PRIMARY KEY (id)
);

--changeset eitarg:1543438531253-2
CREATE TABLE customers (
  cleaning_notifications BOOLEAN,
  confirmed              BOOLEAN,
  id                     BIGINT NOT NULL,
  CONSTRAINT customers_pkey PRIMARY KEY (id)
);

--changeset eitarg:1543438531253-3
CREATE TABLE feedback (
  id          BIGSERIAL NOT NULL,
  rate        INTEGER,
  text        VARCHAR(255),
  service_id  BIGINT    NOT NULL,
  customer_id BIGINT    NOT NULL,
  CONSTRAINT feedback_pkey PRIMARY KEY (id)
);

--changeset eitarg:1543438531253-4
CREATE TABLE orders (
  id                          BIGSERIAL NOT NULL,
  address                     VARCHAR(255),
  lat                         FLOAT8,
  lon                         FLOAT8,
  bathrooms_count             INTEGER,
  big_rooms_count             INTEGER,
  cleaning_day                date,
  cleaning_time               VARCHAR(255),
  cleaning_type               VARCHAR(255),
  duration                    VARCHAR(255),
  unregistered_customer_email VARCHAR(255),
  estimated_time              TIME WITHOUT TIME ZONE,
  frequency                   VARCHAR(255),
  price                       numeric(19, 2),
  small_rooms_count           INTEGER,
  status                      VARCHAR(255),
  service_id                  BIGINT    NOT NULL,
  customer_id                 BIGINT,
  CONSTRAINT orders_pkey PRIMARY KEY (id)
);

--changeset eitarg:1543438531253-5
CREATE TABLE prices (
  id                               BIGSERIAL NOT NULL,
  base_price                       numeric(19, 2),
  bathroom                         FLOAT8,
  big_room                         FLOAT8,
  dry_carpet_cleaning              FLOAT8,
  furniture_and_coatings_cleaning  FLOAT8,
  industrial_cleaning              FLOAT8,
  office_cleaning                  FLOAT8,
  pool_cleaning                    FLOAT8,
  repair_and_construction_cleaning FLOAT8,
  small_room                       FLOAT8,
  spring_cleaning                  FLOAT8,
  standard_room_cleaning           FLOAT8,
  CONSTRAINT prices_pkey PRIMARY KEY (id)
);

--changeset eitarg:1543438531253-6
CREATE TABLE roles (
  id   BIGSERIAL NOT NULL,
  name VARCHAR(255),
  CONSTRAINT roles_pkey PRIMARY KEY (id)
);

--changeset eitarg:1543438531253-7
CREATE TABLE services (
  confirmed   BOOLEAN,
  description VARCHAR(255),
  id          BIGINT NOT NULL,
  CONSTRAINT services_pkey PRIMARY KEY (id)
);

--changeset eitarg:1543438531253-8
CREATE TABLE types_of_provided_service (
  id                               BIGSERIAL NOT NULL,
  dry_carpet_cleaning              BOOLEAN,
  furniture_and_coatings_cleaning  BOOLEAN,
  industrial_cleaning              BOOLEAN,
  office_cleaning                  BOOLEAN,
  pool_cleaning                    BOOLEAN,
  repair_and_construction_cleaning BOOLEAN,
  spring_cleaning                  BOOLEAN,
  standard_room_cleaning           BOOLEAN,
  cleaning_time_id                 BIGINT,
  service_id                       BIGINT    NOT NULL,
  price_id                         BIGINT,
  CONSTRAINT types_of_provided_service_pkey PRIMARY KEY (id)
);

--changeset eitarg:1543438531253-9
CREATE TABLE users (
  id          BIGSERIAL NOT NULL,
  adding_date date,
  address     VARCHAR(255),
  lat         FLOAT8,
  lon         FLOAT8,
  ban_reason  VARCHAR(255),
  banned      BOOLEAN   NOT NULL,
  email       VARCHAR(30),
  password    VARCHAR(255),
  phone       VARCHAR(255),
  username    VARCHAR(50),
  CONSTRAINT users_pkey PRIMARY KEY (id)
);

--changeset eitarg:1543438531253-10
CREATE TABLE users_roles (
  user_id  BIGINT NOT NULL,
  roles_id BIGINT NOT NULL
);

--changeset eitarg:1543438531253-11
ALTER TABLE types_of_provided_service
  ADD CONSTRAINT fk2enol7tes7md4fcwnvrqqs055 FOREIGN KEY (service_id) REFERENCES services (id) ON UPDATE NO ACTION ON DELETE NO ACTION;

--changeset eitarg:1543438531253-12
ALTER TABLE users_roles
  ADD CONSTRAINT fk2o0jvgh89lemvvo17cbqvdxaa FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE NO ACTION ON DELETE NO ACTION;

--changeset eitarg:1543438531253-13
ALTER TABLE types_of_provided_service
  ADD CONSTRAINT fk7ajx6ih8oo5s9jpg0magjk8i0 FOREIGN KEY (price_id) REFERENCES prices (id) ON UPDATE NO ACTION ON DELETE NO ACTION;

--changeset eitarg:1543438531253-14
ALTER TABLE users_roles
  ADD CONSTRAINT fka62j07k5mhgifpp955h37ponj FOREIGN KEY (roles_id) REFERENCES roles (id) ON UPDATE NO ACTION ON DELETE NO ACTION;

--changeset eitarg:1543438531253-15
ALTER TABLE types_of_provided_service
  ADD CONSTRAINT fkfykfcsw0yhsj1w0vx4dkoeng2 FOREIGN KEY (cleaning_time_id) REFERENCES cleaning_time (id) ON UPDATE NO ACTION ON DELETE NO ACTION;

--changeset eitarg:1543438531253-16
ALTER TABLE feedback
  ADD CONSTRAINT fkgk6oc7o2w429cg01itvxhu3sj FOREIGN KEY (service_id) REFERENCES services (id) ON UPDATE NO ACTION ON DELETE NO ACTION;

--changeset eitarg:1543438531253-17
ALTER TABLE feedback
  ADD CONSTRAINT fkgoq19ypartivvuoeld2s07y1o FOREIGN KEY (customer_id) REFERENCES customers (id) ON UPDATE NO ACTION ON DELETE NO ACTION;

--changeset eitarg:1543438531253-18
ALTER TABLE orders
  ADD CONSTRAINT fkj7bkj6q0u3681uv3bvq21316i FOREIGN KEY (service_id) REFERENCES services (id) ON UPDATE NO ACTION ON DELETE NO ACTION;

--changeset eitarg:1543438531253-19
ALTER TABLE customers
  ADD CONSTRAINT fkpog72rpahj62h7nod9wwc28if FOREIGN KEY (id) REFERENCES users (id) ON UPDATE NO ACTION ON DELETE NO ACTION;

--changeset eitarg:1543438531253-20
ALTER TABLE orders
  ADD CONSTRAINT fkpxtb8awmi0dk6smoh2vp1litg FOREIGN KEY (customer_id) REFERENCES customers (id) ON UPDATE NO ACTION ON DELETE NO ACTION;

--changeset eitarg:1543438531253-21
ALTER TABLE services
  ADD CONSTRAINT fkst1c0fb9asyyi4k7pg6kh6uyp FOREIGN KEY (id) REFERENCES users (id) ON UPDATE NO ACTION ON DELETE NO ACTION;

INSERT INTO public.roles (name)
VALUES ('admin'),
       ('service'),
       ('customer');