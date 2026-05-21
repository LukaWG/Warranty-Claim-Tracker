-- AlterTable
ALTER TABLE "user" ADD COLUMN     "custom_role" TEXT DEFAULT 'Processor',
ADD COLUMN     "default_site" TEXT,
ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "last_name" TEXT;
