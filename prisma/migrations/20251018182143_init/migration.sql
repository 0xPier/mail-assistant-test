-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "phone" TEXT,
    "locale" TEXT NOT NULL DEFAULT 'en',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "FileAsset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "checksum" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Template" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "contextByLocale" JSONB NOT NULL,
    "promptExamples" JSONB NOT NULL,
    "defaultLanguage" TEXT NOT NULL DEFAULT 'en',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TemplateAttachment" (
    "templateId" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,

    PRIMARY KEY ("templateId", "fileId"),
    CONSTRAINT "TemplateAttachment_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TemplateAttachment_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "FileAsset" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EmailJob" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contactId" TEXT NOT NULL,
    "templateId" TEXT,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'en',
    "status" TEXT NOT NULL DEFAULT 'QUEUED',
    "scheduledAt" DATETIME,
    "sentAt" DATETIME,
    "providerJobId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EmailJob_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "EmailJob_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EmailJobAttachment" (
    "emailJobId" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,

    PRIMARY KEY ("emailJobId", "fileId"),
    CONSTRAINT "EmailJobAttachment_emailJobId_fkey" FOREIGN KEY ("emailJobId") REFERENCES "EmailJob" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "EmailJobAttachment_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "FileAsset" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LeadFormSubmission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "phone" TEXT,
    "locale" TEXT NOT NULL DEFAULT 'en',
    "notes" TEXT,
    "source" TEXT,
    "followUpVia" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contactId" TEXT,
    CONSTRAINT "LeadFormSubmission_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact_email_key" ON "Contact"("email");
