--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5
-- Dumped by pg_dump version 10.5

-- Started on 2018-08-27 11:32:26

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.answers DROP CONSTRAINT IF EXISTS question_fk;
DROP TRIGGER IF EXISTS "updateQuestion" ON public.questions;
DROP TRIGGER IF EXISTS "updateAnswer" ON public.answers;
ALTER TABLE IF EXISTS ONLY public.questions DROP CONSTRAINT IF EXISTS questions_pkey;
ALTER TABLE IF EXISTS ONLY public.answers DROP CONSTRAINT IF EXISTS answers_pkey;
ALTER TABLE IF EXISTS public.questions ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.answers ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.questions_id_seq;
DROP TABLE IF EXISTS public.questions;
DROP SEQUENCE IF EXISTS public.answers_id_seq;
DROP TABLE IF EXISTS public.answers;
DROP FUNCTION IF EXISTS public.edited();
DROP EXTENSION IF EXISTS plpgsql;
DROP SCHEMA IF EXISTS public;
--
-- TOC entry 6 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- TOC entry 2819 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 1 (class 3079 OID 12924)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2820 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- TOC entry 200 (class 1255 OID 16590)
-- Name: edited(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.edited() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.edited := NOW();
  RETURN NEW;
END;
$$;


--
-- TOC entry 2821 (class 0 OID 0)
-- Dependencies: 200
-- Name: FUNCTION edited(); Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON FUNCTION public.edited() IS 'Trigger function for edited timestamp';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 199 (class 1259 OID 16594)
-- Name: answers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.answers (
    id integer NOT NULL,
    answer jsonb NOT NULL,
    question_id integer NOT NULL,
    created timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    edited timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- TOC entry 198 (class 1259 OID 16592)
-- Name: answers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.answers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2822 (class 0 OID 0)
-- Dependencies: 198
-- Name: answers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.answers_id_seq OWNED BY public.answers.id;


--
-- TOC entry 197 (class 1259 OID 16579)
-- Name: questions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.questions (
    id integer NOT NULL,
    type character varying(10) NOT NULL,
    content jsonb NOT NULL,
    created timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    edited timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- TOC entry 2823 (class 0 OID 0)
-- Dependencies: 197
-- Name: TABLE questions; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.questions IS 'Web Development Questions';


--
-- TOC entry 2824 (class 0 OID 0)
-- Dependencies: 197
-- Name: COLUMN questions.created; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.questions.created IS 'Date created';


--
-- TOC entry 2825 (class 0 OID 0)
-- Dependencies: 197
-- Name: COLUMN questions.edited; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.questions.edited IS 'Date of latest Edit';


--
-- TOC entry 196 (class 1259 OID 16577)
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2826 (class 0 OID 0)
-- Dependencies: 196
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;


--
-- TOC entry 2682 (class 2604 OID 16597)
-- Name: answers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.answers ALTER COLUMN id SET DEFAULT nextval('public.answers_id_seq'::regclass);


--
-- TOC entry 2679 (class 2604 OID 16582)
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);


--
-- TOC entry 2688 (class 2606 OID 16604)
-- Name: answers answers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (id);


--
-- TOC entry 2686 (class 2606 OID 16589)
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- TOC entry 2691 (class 2620 OID 16610)
-- Name: answers updateAnswer; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER "updateAnswer" BEFORE UPDATE OF answer ON public.answers FOR EACH ROW EXECUTE PROCEDURE public.edited();


--
-- TOC entry 2690 (class 2620 OID 16591)
-- Name: questions updateQuestion; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER "updateQuestion" BEFORE UPDATE OF type, content ON public.questions FOR EACH ROW EXECUTE PROCEDURE public.edited();


--
-- TOC entry 2827 (class 0 OID 0)
-- Dependencies: 2690
-- Name: TRIGGER "updateQuestion" ON questions; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TRIGGER "updateQuestion" ON public.questions IS 'If content for Question changes, updates edited timestamp.';


--
-- TOC entry 2689 (class 2606 OID 16605)
-- Name: answers question_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT question_fk FOREIGN KEY (question_id) REFERENCES public.questions(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2018-08-27 11:32:28

--
-- PostgreSQL database dump complete
--

