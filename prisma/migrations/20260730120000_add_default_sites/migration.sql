-- AlterTable
ALTER TABLE "user" ADD COLUMN     "default_sites" TEXT[] DEFAULT ARRAY[]::TEXT[];
