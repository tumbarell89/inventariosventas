--
-- PostgreSQL database dump
--


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 4885 (class 0 OID 0)
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
-- TOC entry 4887 (class 0 OID 0)
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
-- TOC entry 4888 (class 0 OID 0)
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
-- TOC entry 4889 (class 0 OID 0)
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
-- TOC entry 4890 (class 0 OID 0)
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
-- TOC entry 4886 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2024-12-22 14:30:40

--
-- PostgreSQL database dump complete
--

