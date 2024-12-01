-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "nombre_negocio" TEXT NOT NULL,
    "es_admin" BOOLEAN NOT NULL DEFAULT false,
    "tipo" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Oferta" (
    "id" SERIAL NOT NULL,
    "producto" TEXT NOT NULL,
    "precio" JSONB NOT NULL,
    "disponible" BOOLEAN NOT NULL DEFAULT true,
    "sincronizado" BOOLEAN NOT NULL DEFAULT false,
    "negocio_id" TEXT NOT NULL,

    CONSTRAINT "Oferta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OperacionFinalizada" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "items" JSONB NOT NULL,
    "total" JSONB NOT NULL,
    "sincronizado" BOOLEAN NOT NULL DEFAULT false,
    "tipoOperacionId" INTEGER NOT NULL,
    "jornadaId" INTEGER NOT NULL,

    CONSTRAINT "OperacionFinalizada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoOperacion" (
    "id" SERIAL NOT NULL,
    "denominacion" TEXT NOT NULL,

    CONSTRAINT "TipoOperacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jornada" (
    "id" SERIAL NOT NULL,
    "inicio" JSONB NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3),
    "totalJornada" JSONB NOT NULL,
    "negocio_id" TEXT NOT NULL,

    CONSTRAINT "Jornada_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_telefono_key" ON "User"("telefono");

-- CreateIndex
CREATE UNIQUE INDEX "User_correo_key" ON "User"("correo");

-- AddForeignKey
ALTER TABLE "Oferta" ADD CONSTRAINT "Oferta_negocio_id_fkey" FOREIGN KEY ("negocio_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperacionFinalizada" ADD CONSTRAINT "OperacionFinalizada_tipoOperacionId_fkey" FOREIGN KEY ("tipoOperacionId") REFERENCES "TipoOperacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperacionFinalizada" ADD CONSTRAINT "OperacionFinalizada_jornadaId_fkey" FOREIGN KEY ("jornadaId") REFERENCES "Jornada"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jornada" ADD CONSTRAINT "Jornada_negocio_id_fkey" FOREIGN KEY ("negocio_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
