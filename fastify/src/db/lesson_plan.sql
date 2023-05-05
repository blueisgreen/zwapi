# for reference; use Prisma for the heavy lifting

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS zanzisworld_public.lesson_plan;
DROP SEQUENCE IF EXISTS zanzisworld_public.lesson_plan_id_seq;

CREATE TABLE IF NOT EXISTS zanzisworld_public.lesson_plan
(
    id serial,
    public_key character varying(36) COLLATE pg_catalog."default" NOT NULL DEFAULT uuid_generate_v4 () ::character varying,
    title character varying COLLATE pg_catalog."default" NOT NULL,
    subtitle character varying COLLATE pg_catalog."default",
    cover character varying COLLATE pg_catalog."default",
    synposis text COLLATE pg_catalog."default",
    objective text COLLATE pg_catalog."default",
    content text COLLATE pg_catalog."default",
    status character varying COLLATE pg_catalog."default",
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    published_at timestamp without time zone,
    archived_at timestamp without time zone,
    CONSTRAINT lesson_plan_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS zanzisworld_public.lesson_plan
    OWNER to postgres;
