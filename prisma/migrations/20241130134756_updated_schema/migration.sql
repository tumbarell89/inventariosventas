/*
  Warnings:

  - You are about to drop the column `activo` on the `User` table. All the data in the column will be lost.
  - Added the required column `contrasena` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "activo",
ADD COLUMN     "contrasena" TEXT NOT NULL,
ADD COLUMN     "habilitado" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "tipo" DROP NOT NULL;
