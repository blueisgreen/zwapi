-- Role: zw_admin
-- DROP ROLE IF EXISTS zw_admin;

CREATE ROLE zw_admin WITH
  LOGIN
  SUPERUSER
  INHERIT
  CREATEDB
  CREATEROLE
  REPLICATION
  ENCRYPTED PASSWORD 'md55f4dd9d2505a8740450cfb9fc92efed0';

COMMENT ON ROLE zw_admin IS 'DB admin for Zanzi''s World';


-- Role: zw_app
-- DROP ROLE IF EXISTS zw_app;

CREATE ROLE zw_app WITH
  LOGIN
  NOSUPERUSER
  INHERIT
  NOCREATEDB
  NOCREATEROLE
  NOREPLICATION
  ENCRYPTED PASSWORD 'md5b559fc377b58c2da8bf21beb74e41f1a';


-- Database: zwdb_dev1

-- DROP DATABASE IF EXISTS zwdb_dev1;

CREATE DATABASE zwdb_dev1
    WITH
    OWNER = zw_admin
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

COMMENT ON DATABASE zwdb_dev1
    IS 'Dev instance of Zanzi''s World db';


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS public.lesson_plan;

CREATE TABLE IF NOT EXISTS public.lesson_plan
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    title character varying COLLATE pg_catalog."default" NOT NULL,
    subtitle character varying COLLATE pg_catalog."default",
    cover character varying COLLATE pg_catalog."default",
    synopsis text COLLATE pg_catalog."default",
    objective text COLLATE pg_catalog."default",
    content text COLLATE pg_catalog."default",
    status character varying COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "publishedAt" timestamp with time zone,
    "archivedAt" timestamp with time zone,
    CONSTRAINT lesson_plan_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.lesson_plan
    OWNER to zw_admin;
