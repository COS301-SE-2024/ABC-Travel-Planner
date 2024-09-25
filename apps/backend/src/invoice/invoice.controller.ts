import { Body, Controller, Post } from "@nestjs/common";
import { InvoiceService } from "./invoice.service";
import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from "path";

@Controller('invoice')
export class InvoiceController {
    constructor(private readonly invoiceService: InvoiceService) {}
    
    @Post('')
    async sayHello() {
        return 'HELLOOOOOO :)'
    }

    @Post('send')
    async sendInvoice(@Body() body: { items: any[]; email: string}) {
        try {
            console.log("ITEMS RECEIVED ON BACKEND SIDE:\n" + body.items + "\n" + body.email)
            const html = await this.invoiceService.generateInvoice(body.items);
            
            //Create a file with html inside...
            const invoicePath = path.join(__dirname, 'invoices', 'email_format.html');
            console.log("PATH TO INVOICE: " + invoicePath)
            if (!fs.existsSync(path.dirname(invoicePath))) {
                fs.mkdirSync(path.dirname(invoicePath), { recursive: true });
                console.log("FILE DOES NOT EXIST!")
            }
    
            fs.writeFileSync(invoicePath, html, 'utf8');
            console.log("FILE CREATED!")

            //Send email...
            try {
                const pythonPromise = await this.createPythonProcess(body.email);
                console.log(pythonPromise)
                console.log('Python script executed successfully:', pythonPromise)
                return `Success: ${pythonPromise}`

            } catch (error) {
                console.error(error)
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    private async createPythonProcess(email: string) {
        return new Promise((resolve, reject) => {
            const scriptPath = path.join(__dirname, 'send_mail.py');
            console.log(__dirname)
            console.log("Script path:" + scriptPath)
            const pythonProcess = spawn('python3', [scriptPath, email]);
            
            let output = '';

            pythonProcess.stdout.on('data', (data) => {
                output += data.toString();
              });
              
            pythonProcess.stderr.on('data', (data) => {
                reject(data.toString());
            });
            
            pythonProcess.on('close', (code) => {
                if (code === 0) {
                    resolve(output);
                } else {
                    reject(`Python script exited with code ${code}`);
                }
            });
        })
    }
}