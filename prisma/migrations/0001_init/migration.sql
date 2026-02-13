-- Initial migration for Enterprise Management System
-- Extensions for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enumerations
DO $$ BEGIN
  CREATE TYPE "Role" AS ENUM ('ADMIN','SALES_TEAM','ORDER_TEAM','CONSTRUCTION_TEAM','PRODUCTION_TEAM','PAINT_SHIPPING_TEAM','PARTNER','CUSTOMER');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "SiteStatus" AS ENUM ('SALES_IN_PROGRESS','CONTRACT_SIGNED','CONSTRUCTION_IN_PROGRESS','CONSTRUCTION_COMPLETED');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "ShipmentStatus" AS ENUM ('DRAFT','ASSIGNED','CONFIRMED');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "RequestStatus" AS ENUM ('PENDING','IN_PROGRESS','COMPLETED');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "NotificationType" AS ENUM ('REQUEST_CREATED','REQUEST_UPDATED','STATUS_CHANGED');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- Tables
CREATE TABLE IF NOT EXISTS "User" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "name" TEXT NOT NULL,
  "role" "Role" NOT NULL,
  "position" TEXT,
  "company" TEXT,
  "employeeId" TEXT,
  "email" TEXT NOT NULL UNIQUE,
  "passwordHash" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Site" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "name" TEXT NOT NULL,
  "address" TEXT NOT NULL,
  "contractVolume" DOUBLE PRECISION NOT NULL,
  "panelType" TEXT NOT NULL,
  "status" "SiteStatus" NOT NULL DEFAULT 'SALES_IN_PROGRESS',
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "creatorId" UUID NOT NULL,
  "customerId" UUID,
  CONSTRAINT "fk_site_creator" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT,
  CONSTRAINT "fk_site_customer" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS "Shipment" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "siteId" UUID NOT NULL,
  "sequence" INTEGER NOT NULL,
  "plannedVolume" DOUBLE PRECISION NOT NULL,
  "actualVolume" DOUBLE PRECISION,
  "plannedDate" TIMESTAMP NOT NULL,
  "status" "ShipmentStatus" NOT NULL DEFAULT 'DRAFT',
  "assignedAt" TIMESTAMP,
  "confirmedAt" TIMESTAMP,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "creatorId" UUID NOT NULL,
  "driverName" TEXT,
  "driverPhone" TEXT,
  "vehicleType" TEXT,
  "vehicleNumber" TEXT,
  "recipientName" TEXT,
  "recipientPhone" TEXT,
  "expectedArrival" TIMESTAMP,
  CONSTRAINT "fk_shipment_site" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE,
  CONSTRAINT "fk_shipment_creator" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS "SpecialNote" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "siteId" UUID NOT NULL,
  "authorId" UUID NOT NULL,
  "content" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT "fk_note_site" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE,
  CONSTRAINT "fk_note_author" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS "Request" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "siteId" UUID NOT NULL,
  "authorId" UUID NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
  "assigneeId" UUID,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT "fk_request_site" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE,
  CONSTRAINT "fk_request_author" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT,
  CONSTRAINT "fk_request_assignee" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS "Document" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "siteId" UUID NOT NULL,
  "uploaderId" UUID NOT NULL,
  "name" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "visibleToCustomer" BOOLEAN NOT NULL DEFAULT FALSE,
  "uploadedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT "fk_document_site" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE,
  CONSTRAINT "fk_document_uploader" FOREIGN KEY ("uploaderId") REFERENCES "User"("id") ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS "Notification" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" UUID NOT NULL,
  "type" "NotificationType" NOT NULL,
  "title" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "link" TEXT,
  "isRead" BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT "fk_notification_user" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "AuditLog" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" UUID,
  "action" TEXT NOT NULL,
  "model" TEXT NOT NULL,
  "recordId" TEXT NOT NULL,
  "description" TEXT,
  "changes" JSONB,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT "fk_auditlog_user" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS "SMSLog" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "phone" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "payload" JSONB,
  "success" BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "userId" UUID,
  "shipmentId" UUID,
  CONSTRAINT "fk_smslog_user" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL,
  CONSTRAINT "fk_smslog_shipment" FOREIGN KEY ("shipmentId") REFERENCES "Shipment"("id") ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS "ProductionPlan" (
  "siteId" UUID PRIMARY KEY,
  "plannedProductionVolume" DOUBLE PRECISION,
  "plannedPaintVolume" DOUBLE PRECISION,
  "plannedShipmentVolume" DOUBLE PRECISION,
  "updatedById" UUID,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT "fk_production_site" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE,
  CONSTRAINT "fk_production_updatedBy" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL
);