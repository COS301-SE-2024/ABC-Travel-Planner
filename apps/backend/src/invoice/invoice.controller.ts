import { Body, Controller, Post } from "@nestjs/common";
import { InvoiceService } from "./invoice.service";
import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from "path";
import { cwd } from "process";

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
            const html = await this.invoiceService.generateInvoice(body.items);
            
            //Create a file with html inside...
            const invoicePath = path.join(__dirname, '../../../frontend/pages/api/', 'email_format.html');
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
                throw new Error(`Failed to execute python script: ${error}`)                
            }
        }
        catch (error) {
            console.error(error);
            throw new Error('Could not create & send invoice');
        }
    }

    private createPythonProcess(email: string) {
        return new Promise((resolve, reject) => {
            const scriptPath = path.join(__dirname, '../../../frontend/pages/api', 'send_mail.py');
            console.log("Script path:" + scriptPath)
            const pythonProcess = spawn('python3', [scriptPath, email]);
            
            let output = '';

            pythonProcess.stdout.on('data', (data) => {
                output += data.toString();
              });
              
            pythonProcess.stderr.on('data', (data) => {
                reject(data.toString());
            });
            
            console.log("Output: " + output)
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