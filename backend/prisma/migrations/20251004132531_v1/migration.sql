-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "tenant_id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Locations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "processOrders" BOOLEAN,
    "addressId" TEXT,
    "contactPerson" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "categoryId" TEXT,
    "sku" TEXT NOT NULL,
    "status" INTEGER,
    "capacity" INTEGER,
    "currentOccupancy" INTEGER,
    "parentLocationId" TEXT,
    CONSTRAINT "Locations_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Locations_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Locations_parentLocationId_fkey" FOREIGN KEY ("parentLocationId") REFERENCES "Locations" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "street" TEXT NOT NULL,
    "addressLine2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT,
    "zipCode" TEXT NOT NULL,
    "country" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isAlsoManufacturer" BOOLEAN,
    "isAlsoSupplier" BOOLEAN,
    "isAlsoCustomer" BOOLEAN,
    "currency" TEXT,
    "avatar" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "addressId" TEXT,
    "contactPerson" TEXT,
    "preferred" BOOLEAN,
    "paymentTerms" TEXT,
    "orderHistory" JSONB,
    "rating" REAL,
    "leadTimeDays" INTEGER,
    "preferredShippingMethod" TEXT,
    CONSTRAINT "Customer_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isAlsoManufacturer" BOOLEAN,
    "isAlsoSupplier" BOOLEAN,
    "isAlsoCustomer" BOOLEAN,
    "currency" TEXT,
    "avatar" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "addressId" TEXT,
    "contactPerson" TEXT,
    "paymentTerms" TEXT,
    "leadTimeDays" INTEGER,
    "rating" REAL,
    "preferred" BOOLEAN,
    CONSTRAINT "Supplier_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Manufacturer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isAlsoManufacturer" BOOLEAN,
    "isAlsoSupplier" BOOLEAN,
    "isAlsoCustomer" BOOLEAN,
    "currency" TEXT,
    "avatar" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "addressId" TEXT,
    "contactPerson" TEXT,
    "rating" REAL,
    "preferred" BOOLEAN,
    "leadTimeDays" INTEGER,
    "paymentTerms" TEXT,
    "productionCapacity" TEXT,
    CONSTRAINT "Manufacturer_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Carrier" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "addressId" TEXT,
    "contactPerson" TEXT,
    "rating" REAL,
    "preferred" BOOLEAN,
    "trackingUrl" TEXT,
    "capacity" TEXT,
    "leadTimeDays" INTEGER,
    "insuranceProvided" BOOLEAN,
    CONSTRAINT "Carrier_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CarrierService" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "carrierId" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "description" TEXT,
    "cost" REAL,
    "estimatedDeliveryDays" INTEGER,
    CONSTRAINT "CarrierService_carrierId_fkey" FOREIGN KEY ("carrierId") REFERENCES "Carrier" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CarrierRegions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "carrierId" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    CONSTRAINT "CarrierRegions_carrierId_fkey" FOREIGN KEY ("carrierId") REFERENCES "Carrier" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Certifications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "issuedBy" TEXT,
    "issueDate" DATETIME,
    "expiryDate" DATETIME,
    "manufacturerId" TEXT NOT NULL,
    "carrierId" TEXT,
    CONSTRAINT "Certifications_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Certifications_carrierId_fkey" FOREIGN KEY ("carrierId") REFERENCES "Carrier" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
