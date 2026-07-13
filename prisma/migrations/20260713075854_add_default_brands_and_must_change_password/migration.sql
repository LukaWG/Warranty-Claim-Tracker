-- AlterTable
ALTER TABLE "user" ADD COLUMN     "default_brands" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "must_change_password" BOOLEAN DEFAULT false;
