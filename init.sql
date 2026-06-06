

--
-- PostgreSQL database dump
--

\restrict HCOJHWoWw6X85LZdwwUMzadnFZE9nTwMXtcDZxaXBuyueGpJVcj1urzABYmxEvK

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

-- Started on 2026-05-23 12:42:58

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 24664)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 24663)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4900 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4742 (class 2604 OID 24667)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4894 (class 0 OID 24664)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password_hash, created_at) FROM stdin;
1	aaa@aaa.ru	$2b$10$5YoFZd.05Ga2RgWidcAkF.QXCaLqvrrQiBDlI3HjAsjKTUKw444mW	2026-04-26 01:28:21.079154
2	a@a.com	$2b$10$PzelzvCxUlZQoIUxiSNhdev/9r3UHENqkwpXH2ER9qA5zLu9t61XW	2026-04-26 17:53:17.836514
3	bbb@bbb.ru	$2b$10$zPOc2C7dSASSX11/0GC9seAKEDeHqPRpmgfq4FIG7Y2zbCVURCWOa	2026-04-30 21:33:44.198772
4	nikita	$2b$10$O1TAFl7PaNuI9pMs.G4h8OunO1BAYzWV7BOUBhYkGMxLAEVKThRVC	2026-05-01 02:28:05.330918
6	test	$2b$10$SEtaYbMRheObtprgf0B64uQNwIejKFTi/V8W7nBY4DycmnF7OJvKK	2026-05-03 18:39:30.31163
\.


--
-- TOC entry 4901 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- TOC entry 4745 (class 2606 OID 24674)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4747 (class 2606 OID 24672)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


-- Completed on 2026-05-23 12:42:58

--
-- PostgreSQL database dump complete
--

\unrestrict HCOJHWoWw6X85LZdwwUMzadnFZE9nTwMXtcDZxaXBuyueGpJVcj1urzABYmxEvK

