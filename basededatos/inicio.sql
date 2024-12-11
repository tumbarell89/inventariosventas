--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.3

-- Started on 2024-12-09 22:26:50

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
-- TOC entry 4867 (class 0 OID 0)
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
-- TOC entry 4869 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

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
-- TOC entry 4870 (class 0 OID 0)
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
-- TOC entry 4703 (class 2604 OID 26908)
-- Name: TipoUsuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TipoUsuarios" ALTER COLUMN id SET DEFAULT nextval('public."TipoUsuarios_id_seq"'::regclass);


--
-- TOC entry 4860 (class 0 OID 26905)
-- Dependencies: 217
-- Data for Name: TipoUsuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."TipoUsuarios" (id, nombre, "createdAt", "updatedAt") VALUES (1, 'Administrador', '2024-12-05 19:51:56.477987', '2024-12-05 19:51:56.477987');
INSERT INTO public."TipoUsuarios" (id, nombre, "createdAt", "updatedAt") VALUES (2, 'Vendedor', '2024-12-05 19:51:56.477987', '2024-12-05 19:51:56.477987');
INSERT INTO public."TipoUsuarios" (id, nombre, "createdAt", "updatedAt") VALUES (3, 'Despachador', '2024-12-05 19:51:56.477987', '2024-12-05 19:51:56.477987');


--
-- TOC entry 4861 (class 0 OID 26927)
-- Dependencies: 218
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Users" (id, telefono, nombre_negocio, es_admin, contrasena, habilitado, id_tipo_usuario, "createdAt", "updatedAt", correo, admin_id) VALUES ('83b0e709-3852-4375-a9ca-ab75950e8a5d', '12345678', 'Paco', true, '$2a$10$E1ZhROwShRlZ4bzPK1mfQee/T03KnFaiD7mnDTEqyRnT/9P6h/BL.', true, NULL, '2024-12-06 06:11:25.669', '2024-12-06 06:11:25.669', NULL, NULL);
INSERT INTO public."Users" (id, telefono, nombre_negocio, es_admin, contrasena, habilitado, id_tipo_usuario, "createdAt", "updatedAt", correo, admin_id) VALUES ('25bfbeb1-2454-4b6b-8c95-e04122a727e0', '12345679', 'gema', true, '$2a$10$Qrk.66FK05qHkdSFK0tXDOz7/hGkHTr2Hs7Aobh6FCiu.jiGE6abi', true, NULL, '2024-12-09 01:24:21.209', '2024-12-09 01:24:21.209', 'sss@gg.com', NULL);
INSERT INTO public."Users" (id, telefono, nombre_negocio, es_admin, contrasena, habilitado, id_tipo_usuario, "createdAt", "updatedAt", correo, admin_id) VALUES ('c310fd87-3859-49c6-b43a-15f758af8aee', '54678932', 'Paco', false, '$2a$10$j9h7nWy7IWIT3FhrUryIbO11k6ZFAh3ENpHnc70Cmkb/I6pjxsWC2', true, 2, '2024-12-09 06:05:34.914', '2024-12-09 06:05:34.914', NULL, '83b0e709-3852-4375-a9ca-ab75950e8a5d');


--
-- TOC entry 4871 (class 0 OID 0)
-- Dependencies: 216
-- Name: TipoUsuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TipoUsuarios_id_seq"', 3, true);


--
-- TOC entry 4708 (class 2606 OID 26912)
-- Name: TipoUsuarios TipoUsuarios_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TipoUsuarios"
    ADD CONSTRAINT "TipoUsuarios_nombre_key" UNIQUE (nombre);


--
-- TOC entry 4710 (class 2606 OID 26910)
-- Name: TipoUsuarios TipoUsuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TipoUsuarios"
    ADD CONSTRAINT "TipoUsuarios_pkey" PRIMARY KEY (id);


--
-- TOC entry 4712 (class 2606 OID 26936)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 4714 (class 2606 OID 26938)
-- Name: Users Users_telefono_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_telefono_key" UNIQUE (telefono);


--
-- TOC entry 4715 (class 2606 OID 26939)
-- Name: Users Users_id_tipo_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_id_tipo_usuario_fkey" FOREIGN KEY (id_tipo_usuario) REFERENCES public."TipoUsuarios"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4868 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2024-12-09 22:26:50

--
-- PostgreSQL database dump complete
--

