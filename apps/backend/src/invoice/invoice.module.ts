import { Module } from "@nestjs/common";
import { InvoiceController } from "./invoice.controller";
import { InvoiceService } from "./invoice.service";

@Module({
    imports: [],
    providers: [InvoiceService],
    controllers: [InvoiceController]
})
export class InvoiceModule{}