--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.3

-- Started on 2024-12-22 04:20:27

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 25612)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 4892 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- TOC entry 2 (class 3079 OID 26916)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 4894 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 27181)
-- Name: Productos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Productos" (
    id integer NOT NULL,
    denominacion character varying(255) NOT NULL,
    procedencia character varying(255) NOT NULL,
    codigo character varying(255) NOT NULL,
    createdat timestamp with time zone NOT NULL,
    updatedat timestamp with time zone NOT NULL
);


ALTER TABLE public."Productos" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 26905)
-- Name: TipoUsuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TipoUsuarios" (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    "createdAt" timestamp without time zone NOT NULL,
    "updatedAt" timestamp without time zone NOT NULL
);


ALTER TABLE public."TipoUsuarios" OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 26904)
-- Name: TipoUsuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TipoUsuarios_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TipoUsuarios_id_seq" OWNER TO postgres;

--
-- TOC entry 4895 (class 0 OID 0)
-- Dependencies: 216
-- Name: TipoUsuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TipoUsuarios_id_seq" OWNED BY public."TipoUsuarios".id;


--
-- TOC entry 218 (class 1259 OID 26927)
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    telefono character varying(255) NOT NULL,
    nombre_negocio character varying(255) NOT NULL,
    es_admin boolean DEFAULT false,
    contrasena character varying(255) NOT NULL,
    habilitado boolean DEFAULT true,
    id_tipo_usuario integer,
    "createdAt" timestamp without time zone NOT NULL,
    "updatedAt" timestamp without time zone NOT NULL,
    correo character varying(255),
    admin_id uuid
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 27290)
-- Name: almacen; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.almacen (
    id integer NOT NULL,
    preciocosto text NOT NULL,
    cantidad integer DEFAULT 0 NOT NULL,
    usuarioid uuid NOT NULL,
    productoid integer NOT NULL,
    createdat timestamp with time zone NOT NULL,
    updatedat timestamp with time zone NOT NULL
);


ALTER TABLE public.almacen OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 27289)
-- Name: almacen_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.almacen_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.almacen_id_seq OWNER TO postgres;

--
-- TOC entry 4896 (class 0 OID 0)
-- Dependencies: 221
-- Name: almacen_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.almacen_id_seq OWNED BY public.almacen.id;


--
-- TOC entry 219 (class 1259 OID 27180)
-- Name: productos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.productos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.productos_id_seq OWNER TO postgres;

--
-- TOC entry 4897 (class 0 OID 0)
-- Dependencies: 219
-- Name: productos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.productos_id_seq OWNED BY public."Productos".id;


--
-- TOC entry 4717 (class 2604 OID 27184)
-- Name: Productos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Productos" ALTER COLUMN id SET DEFAULT nextval('public.productos_id_seq'::regclass);


--
-- TOC entry 4713 (class 2604 OID 26908)
-- Name: TipoUsuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TipoUsuarios" ALTER COLUMN id SET DEFAULT nextval('public."TipoUsuarios_id_seq"'::regclass);


--
-- TOC entry 4718 (class 2604 OID 27293)
-- Name: almacen id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.almacen ALTER COLUMN id SET DEFAULT nextval('public.almacen_id_seq'::regclass);


--
-- TOC entry 4884 (class 0 OID 27181)
-- Dependencies: 220
-- Data for Name: Productos; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4881 (class 0 OID 26905)
-- Dependencies: 217
-- Data for Name: TipoUsuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."TipoUsuarios" (id, nombre, "createdAt", "updatedAt") VALUES (1, 'Administrador', '2024-12-05 19:51:56.477987', '2024-12-05 19:51:56.477987');
INSERT INTO public."TipoUsuarios" (id, nombre, "createdAt", "updatedAt") VALUES (2, 'Vendedor', '2024-12-05 19:51:56.477987', '2024-12-05 19:51:56.477987');
INSERT INTO public."TipoUsuarios" (id, nombre, "createdAt", "updatedAt") VALUES (3, 'Despachador', '2024-12-05 19:51:56.477987', '2024-12-05 19:51:56.477987');


--
-- TOC entry 4882 (class 0 OID 26927)
-- Dependencies: 218
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Users" (id, telefono, nombre_negocio, es_admin, contrasena, habilitado, id_tipo_usuario, "createdAt", "updatedAt", correo, admin_id) VALUES ('50defc88-3ca7-43fb-a4a2-aec374677a4b', '12345678', 'PAco', true, '$2a$10$.r2J.al1vMgtakLnEctqOuG8JjPiBRcJ3lXq108U49RAlSsTBJEUW', true, NULL, '2024-12-11 03:55:07.931', '2024-12-11 03:55:07.931', 'aaa@ss.co', NULL);
INSERT INTO public."Users" (id, telefono, nombre_negocio, es_admin, contrasena, habilitado, id_tipo_usuario, "createdAt", "updatedAt", correo, admin_id) VALUES ('123c17a7-7951-4884-9bbd-28608316f197', '54678932', 'PAco', false, '$2a$10$1TmVD.2YKwYlXu9VbYBEbeMS0pFtYNz8OEZqkk5qZR87NfYQj61ny', true, 2, '2024-12-15 22:42:50.153', '2024-12-15 23:06:00.261', NULL, '50defc88-3ca7-43fb-a4a2-aec374677a4b');


--
-- TOC entry 4886 (class 0 OID 27290)
-- Dependencies: 222
-- Data for Name: almacen; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4898 (class 0 OID 0)
-- Dependencies: 216
-- Name: TipoUsuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TipoUsuarios_id_seq"', 3, true);


--
-- TOC entry 4899 (class 0 OID 0)
-- Dependencies: 221
-- Name: almacen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.almacen_id_seq', 1, false);


--
-- TOC entry 4900 (class 0 OID 0)
-- Dependencies: 219
-- Name: productos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.productos_id_seq', 1, false);


--
-- TOC entry 4721 (class 2606 OID 26912)
-- Name: TipoUsuarios TipoUsuarios_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TipoUsuarios"
    ADD CONSTRAINT "TipoUsuarios_nombre_key" UNIQUE (nombre);


--
-- TOC entry 4723 (class 2606 OID 26910)
-- Name: TipoUsuarios TipoUsuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TipoUsuarios"
    ADD CONSTRAINT "TipoUsuarios_pkey" PRIMARY KEY (id);


--
-- TOC entry 4725 (class 2606 OID 26936)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 4727 (class 2606 OID 26938)
-- Name: Users Users_telefono_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_telefono_key" UNIQUE (telefono);


--
-- TOC entry 4733 (class 2606 OID 27298)
-- Name: almacen almacen_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.almacen
    ADD CONSTRAINT almacen_pkey PRIMARY KEY (id);


--
-- TOC entry 4729 (class 2606 OID 27190)
-- Name: Productos productos_codigo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Productos"
    ADD CONSTRAINT productos_codigo_key UNIQUE (codigo);


--
-- TOC entry 4731 (class 2606 OID 27188)
-- Name: Productos productos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Productos"
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id);


--
-- TOC entry 4734 (class 2606 OID 26939)
-- Name: Users Users_id_tipo_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_id_tipo_usuario_fkey" FOREIGN KEY (id_tipo_usuario) REFERENCES public."TipoUsuarios"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4735 (class 2606 OID 27304)
-- Name: almacen almacen_productoid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.almacen
    ADD CONSTRAINT almacen_productoid_fkey FOREIGN KEY (productoid) REFERENCES public."Productos"(id);


--
-- TOC entry 4736 (class 2606 OID 27299)
-- Name: almacen almacen_usuarioid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.almacen
    ADD CONSTRAINT almacen_usuarioid_fkey FOREIGN KEY (usuarioid) REFERENCES public."Users"(id);


--
-- TOC entry 4893 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2024-12-22 04:20:27

--
-- PostgreSQL database dump complete
--

