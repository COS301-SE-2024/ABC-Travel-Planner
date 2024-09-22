import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import * as path from 'path';

@Injectable()
export class ChatService {

    async resolveQuery(query: string): Promise<any> {
        return new Promise((resolve, reject) => {
            // Use path.resolve to construct an absolute path to the Python script
            const scriptPath = path.resolve(__dirname, 'src', 'chat', 'model', 'chat.py');

            // Call the Python script using the absolute path
            const pythonProcess = spawn('python3', ['src/chat/model/chat.py', query]);

            let scriptOutput = '';

            pythonProcess.stdout.on('data', (data) => {
                scriptOutput += data.toString();
            });

            pythonProcess.stderr.on('data', (data) => {
                const output = data.toString();
                if (!output.includes('Some weights of the model checkpoint at') &&
                    !output.includes('FutureWarning: `clean_up_tokenization_spaces` was not set.') &&
                    !output.includes('Some weights of PegasusForConditionalGeneration were not initialized from the model checkpoint at')) {
                    console.error(`Error: ${output}`);
                    reject(output);
                }
            });

            pythonProcess.on('close', (code) => {
                if (code !== 0) {
                    reject(`Python script exited with code ${code}`);
                } else {
                    resolve(JSON.parse(scriptOutput));
                }
            });
        });
    }
}
