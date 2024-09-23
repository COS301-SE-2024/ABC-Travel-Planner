import { Injectable } from "@nestjs/common";
import * as ejs from 'ejs'
import * as fs from 'fs'
import * as path from 'path'

interface Items {
    item_name: string,
    item_dates: string,
    item_cost: number
}

@Injectable()
export class InvoiceService {
    constructor() {}
    async generateInvoice(items: Items[]) : Promise<string> {
        const pathToTemplate = path.join(__dirname, 'template', 'email_format.ejs')
        const template  = fs.readFileSync(pathToTemplate, 'utf-8')

        const htmlInvoice = await ejs.render(template, { items })
        return htmlInvoice
    }
}