-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('MASCULINO', 'FEMENINO');

-- CreateEnum
CREATE TYPE "ROL" AS ENUM ('ADMINISTRADOR', 'EMPLEADO', 'CLIENTE');

-- CreateEnum
CREATE TYPE "APPOINTMENT_SOLICITATION_STATE" AS ENUM ('PENDIENTE', 'APROBADO', 'RECHAZADO');

-- CreateEnum
CREATE TYPE "APPOINTMENT_STATE" AS ENUM ('PENDIENTE', 'ATENDIDO');

-- CreateEnum
CREATE TYPE "PAY_METHOD" AS ENUM ('LINEA', 'CAJA');

-- CreateEnum
CREATE TYPE "EMPLOYEE_STATE" AS ENUM ('ENABLED', 'DISABLED');

-- CreateEnum
CREATE TYPE "REQUEST_STATE" AS ENUM ('PENDIENTE', 'APROBADO', 'RECHAZADO');

-- CreateEnum
CREATE TYPE "INVENTORY_MOVEMENT_TYPE" AS ENUM ('ENTRADA', 'SALIDA', 'PEDIDO');

-- CreateEnum
CREATE TYPE "POSITIONS" AS ENUM ('MEDICO', 'ENFERMERO', 'ADMINISTRATIVO', 'RECEPCION', 'LIMPIEZA', 'SEGURIDAD');

-- CreateTable
CREATE TABLE "USER" (
    "Id" SERIAL NOT NULL,
    "User_Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Role" "ROL" NOT NULL,
    "Device_Token" TEXT,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3),

    CONSTRAINT "USER_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "PERSON" (
    "Id" SERIAL NOT NULL,
    "DNI" TEXT NOT NULL,
    "First_Name" TEXT NOT NULL,
    "Last_Name" TEXT NOT NULL,
    "Birth_Date" TEXT NOT NULL,
    "Phone_Number" TEXT,
    "Address" TEXT,
    "Gender" "GENDER" NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PERSON_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "SCHEDULE" (
    "Id" SERIAL NOT NULL,
    "ScheduleName" TEXT NOT NULL,
    "Schedule" JSONB NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SCHEDULE_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "EMPLOYEE" (
    "Id" SERIAL NOT NULL,
    "Email" TEXT NOT NULL,
    "Person_Fk" INTEGER NOT NULL,
    "User_Fk" INTEGER NOT NULL,
    "Position" "POSITIONS" NOT NULL,
    "Start_Date" TIMESTAMP(3) NOT NULL,
    "Days_Spent" INTEGER DEFAULT 0,
    "State" "EMPLOYEE_STATE" NOT NULL DEFAULT 'ENABLED',
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EMPLOYEE_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "SALARY" (
    "Id" SERIAL NOT NULL,
    "Employee_Fk" INTEGER NOT NULL,
    "Amount" DOUBLE PRECISION NOT NULL,
    "State" BOOLEAN NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SALARY_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "SCHEDULE_EMPLOYEE" (
    "Id" SERIAL NOT NULL,
    "Schedule_Fk" INTEGER NOT NULL,
    "Employee_Fk" INTEGER NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SCHEDULE_EMPLOYEE_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "PERMISION" (
    "Id" SERIAL NOT NULL,
    "Employee_Fk" INTEGER NOT NULL,
    "Reason" TEXT NOT NULL,
    "State" "REQUEST_STATE" NOT NULL,
    "Read" BOOLEAN NOT NULL,
    "ReadEmployee" BOOLEAN NOT NULL,
    "Description" TEXT NOT NULL,
    "Answer" TEXT,
    "Attached_File" TEXT,
    "Start_Date" TEXT NOT NULL,
    "End_Date" TEXT NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PERMISION_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "VACATION" (
    "Id" SERIAL NOT NULL,
    "Employee_Fk" INTEGER NOT NULL,
    "State" "REQUEST_STATE" NOT NULL,
    "Read" BOOLEAN NOT NULL,
    "ReadEmployee" BOOLEAN NOT NULL,
    "Answer" TEXT,
    "Start_Date" TEXT NOT NULL,
    "End_Date" TEXT NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VACATION_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "CLIENT" (
    "Id" SERIAL NOT NULL,
    "Person_Fk" INTEGER NOT NULL,
    "User_Fk" INTEGER,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CLIENT_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "SUPPLIER" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SUPPLIER_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "CATEGORY" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "description" TEXT,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CATEGORY_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "PRODUCT" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Description" TEXT,
    "Brand" TEXT NOT NULL,
    "Price_Buy" DOUBLE PRECISION NOT NULL,
    "Price_Sell" DOUBLE PRECISION NOT NULL,
    "Image" TEXT,
    "Supplier_Fk" INTEGER NOT NULL,
    "Category_Fk" INTEGER NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PRODUCT_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "INVENTORY" (
    "Id" SERIAL NOT NULL,
    "Product_Fk" INTEGER NOT NULL,
    "Stock" INTEGER NOT NULL,
    "Min_Stock" INTEGER NOT NULL,
    "Valued_Inventory" DOUBLE PRECISION NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "INVENTORY_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "APPOINTMENT" (
    "Id" SERIAL NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "Description" TEXT,
    "Client_Fk" INTEGER NOT NULL,
    "Employee_Fk" INTEGER NOT NULL,
    "State" "APPOINTMENT_STATE" NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "APPOINTMENT_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "APPOINTMENT_SOLICITATION" (
    "Id" SERIAL NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "Client_Fk" INTEGER NOT NULL,
    "Description" TEXT NOT NULL,
    "State" "APPOINTMENT_SOLICITATION_STATE" NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "APPOINTMENT_SOLICITATION_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "SERVICE" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Description" TEXT,
    "Price" DOUBLE PRECISION NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SERVICE_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "PURCHASE_QUOTATION" (
    "Id" SERIAL NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "Description" TEXT,
    "State" BOOLEAN NOT NULL,
    "Product_Fk" INTEGER NOT NULL,
    "Supplier_Fk" INTEGER NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PURCHASE_QUOTATION_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "PURCHASE_ORDER_DETAILED" (
    "Id" SERIAL NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "Description" TEXT,
    "Product_Fk" INTEGER NOT NULL,
    "Purchase_Order_Fk" INTEGER NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PURCHASE_ORDER_DETAILED_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "PURCHASE_ORDER" (
    "Id" SERIAL NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "Invoice_File" TEXT,
    "State" "REQUEST_STATE" NOT NULL,
    "Total" DOUBLE PRECISION NOT NULL,
    "Supplier_Fk" INTEGER NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PURCHASE_ORDER_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "SALE_ORDER" (
    "Id" SERIAL NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "Client_Fk" INTEGER NOT NULL,
    "Employee_Fk" INTEGER NOT NULL,
    "Order_File" TEXT,
    "State" "REQUEST_STATE" NOT NULL,
    "Read" BOOLEAN NOT NULL,
    "ReadClient" BOOLEAN NOT NULL,
    "Subtotal" DOUBLE PRECISION NOT NULL,
    "Discount" DOUBLE PRECISION,
    "ISV" DOUBLE PRECISION NOT NULL,
    "Total" DOUBLE PRECISION NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SALE_ORDER_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "INVOICE_ORDER_PRODUCT_DETAILS" (
    "Id" SERIAL NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "Product_Fk" INTEGER NOT NULL,
    "Description" TEXT,
    "Invoice_Order_Fk" INTEGER NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "INVOICE_ORDER_PRODUCT_DETAILS_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "INVOICE_ORDER_SERVICE_DETAILS" (
    "Id" SERIAL NOT NULL,
    "Service_Fk" INTEGER NOT NULL,
    "Discount" DOUBLE PRECISION,
    "Description" TEXT,
    "Invoice_Order_Fk" INTEGER NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "INVOICE_ORDER_SERVICE_DETAILS_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "INVOICE_ORDER" (
    "Id" SERIAL NOT NULL,
    "Client_Fk" INTEGER,
    "Employee_Fk" INTEGER NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "Invoice_File" TEXT,
    "PayMethod" "PAY_METHOD" NOT NULL DEFAULT 'CAJA',
    "Subtotal" DOUBLE PRECISION NOT NULL,
    "Discount" DOUBLE PRECISION,
    "ISV" DOUBLE PRECISION NOT NULL,
    "Total" DOUBLE PRECISION NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "INVOICE_ORDER_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "ACTIVITY_LOG" (
    "Id" SERIAL NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ACTIVITY_LOG_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "INVENTORY_MOVEMENT" (
    "Id" SERIAL NOT NULL,
    "Product_Fk" INTEGER NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "Description" TEXT NOT NULL,
    "State" "INVENTORY_MOVEMENT_TYPE" NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "INVENTORY_MOVEMENT_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "USER_Email_key" ON "USER"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "PERSON_DNI_key" ON "PERSON"("DNI");

-- CreateIndex
CREATE UNIQUE INDEX "EMPLOYEE_Email_key" ON "EMPLOYEE"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "SUPPLIER_Email_key" ON "SUPPLIER"("Email");

-- AddForeignKey
ALTER TABLE "EMPLOYEE" ADD CONSTRAINT "EMPLOYEE_Person_Fk_fkey" FOREIGN KEY ("Person_Fk") REFERENCES "PERSON"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EMPLOYEE" ADD CONSTRAINT "EMPLOYEE_User_Fk_fkey" FOREIGN KEY ("User_Fk") REFERENCES "USER"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SALARY" ADD CONSTRAINT "SALARY_Employee_Fk_fkey" FOREIGN KEY ("Employee_Fk") REFERENCES "EMPLOYEE"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SCHEDULE_EMPLOYEE" ADD CONSTRAINT "SCHEDULE_EMPLOYEE_Schedule_Fk_fkey" FOREIGN KEY ("Schedule_Fk") REFERENCES "SCHEDULE"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SCHEDULE_EMPLOYEE" ADD CONSTRAINT "SCHEDULE_EMPLOYEE_Employee_Fk_fkey" FOREIGN KEY ("Employee_Fk") REFERENCES "EMPLOYEE"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PERMISION" ADD CONSTRAINT "PERMISION_Employee_Fk_fkey" FOREIGN KEY ("Employee_Fk") REFERENCES "EMPLOYEE"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VACATION" ADD CONSTRAINT "VACATION_Employee_Fk_fkey" FOREIGN KEY ("Employee_Fk") REFERENCES "EMPLOYEE"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CLIENT" ADD CONSTRAINT "CLIENT_Person_Fk_fkey" FOREIGN KEY ("Person_Fk") REFERENCES "PERSON"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CLIENT" ADD CONSTRAINT "CLIENT_User_Fk_fkey" FOREIGN KEY ("User_Fk") REFERENCES "USER"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PRODUCT" ADD CONSTRAINT "PRODUCT_Supplier_Fk_fkey" FOREIGN KEY ("Supplier_Fk") REFERENCES "SUPPLIER"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PRODUCT" ADD CONSTRAINT "PRODUCT_Category_Fk_fkey" FOREIGN KEY ("Category_Fk") REFERENCES "CATEGORY"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "INVENTORY" ADD CONSTRAINT "INVENTORY_Product_Fk_fkey" FOREIGN KEY ("Product_Fk") REFERENCES "PRODUCT"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "APPOINTMENT" ADD CONSTRAINT "APPOINTMENT_Client_Fk_fkey" FOREIGN KEY ("Client_Fk") REFERENCES "CLIENT"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "APPOINTMENT" ADD CONSTRAINT "APPOINTMENT_Employee_Fk_fkey" FOREIGN KEY ("Employee_Fk") REFERENCES "EMPLOYEE"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "APPOINTMENT_SOLICITATION" ADD CONSTRAINT "APPOINTMENT_SOLICITATION_Client_Fk_fkey" FOREIGN KEY ("Client_Fk") REFERENCES "CLIENT"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PURCHASE_QUOTATION" ADD CONSTRAINT "PURCHASE_QUOTATION_Product_Fk_fkey" FOREIGN KEY ("Product_Fk") REFERENCES "PRODUCT"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PURCHASE_QUOTATION" ADD CONSTRAINT "PURCHASE_QUOTATION_Supplier_Fk_fkey" FOREIGN KEY ("Supplier_Fk") REFERENCES "SUPPLIER"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PURCHASE_ORDER_DETAILED" ADD CONSTRAINT "PURCHASE_ORDER_DETAILED_Product_Fk_fkey" FOREIGN KEY ("Product_Fk") REFERENCES "PRODUCT"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PURCHASE_ORDER_DETAILED" ADD CONSTRAINT "PURCHASE_ORDER_DETAILED_Purchase_Order_Fk_fkey" FOREIGN KEY ("Purchase_Order_Fk") REFERENCES "PURCHASE_ORDER"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PURCHASE_ORDER" ADD CONSTRAINT "PURCHASE_ORDER_Supplier_Fk_fkey" FOREIGN KEY ("Supplier_Fk") REFERENCES "SUPPLIER"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SALE_ORDER" ADD CONSTRAINT "SALE_ORDER_Client_Fk_fkey" FOREIGN KEY ("Client_Fk") REFERENCES "CLIENT"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SALE_ORDER" ADD CONSTRAINT "SALE_ORDER_Employee_Fk_fkey" FOREIGN KEY ("Employee_Fk") REFERENCES "EMPLOYEE"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "INVOICE_ORDER_PRODUCT_DETAILS" ADD CONSTRAINT "INVOICE_ORDER_PRODUCT_DETAILS_Product_Fk_fkey" FOREIGN KEY ("Product_Fk") REFERENCES "PRODUCT"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "INVOICE_ORDER_PRODUCT_DETAILS" ADD CONSTRAINT "INVOICE_ORDER_PRODUCT_DETAILS_Invoice_Order_Fk_fkey" FOREIGN KEY ("Invoice_Order_Fk") REFERENCES "INVOICE_ORDER"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "INVOICE_ORDER_SERVICE_DETAILS" ADD CONSTRAINT "INVOICE_ORDER_SERVICE_DETAILS_Service_Fk_fkey" FOREIGN KEY ("Service_Fk") REFERENCES "SERVICE"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "INVOICE_ORDER_SERVICE_DETAILS" ADD CONSTRAINT "INVOICE_ORDER_SERVICE_DETAILS_Invoice_Order_Fk_fkey" FOREIGN KEY ("Invoice_Order_Fk") REFERENCES "INVOICE_ORDER"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "INVOICE_ORDER" ADD CONSTRAINT "INVOICE_ORDER_Client_Fk_fkey" FOREIGN KEY ("Client_Fk") REFERENCES "CLIENT"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "INVOICE_ORDER" ADD CONSTRAINT "INVOICE_ORDER_Employee_Fk_fkey" FOREIGN KEY ("Employee_Fk") REFERENCES "EMPLOYEE"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "INVENTORY_MOVEMENT" ADD CONSTRAINT "INVENTORY_MOVEMENT_Product_Fk_fkey" FOREIGN KEY ("Product_Fk") REFERENCES "PRODUCT"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
