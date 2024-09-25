// import { Injectable } from '@nestjs/common';
// import { spawn } from 'child_process';

// @Injectable()
// export class ChatService {

//     async resolveQuery(query: string): Promise<any> {
//         return new Promise((resolve, reject) => {
//             const pythonProcess = spawn('python3', ['../../../model/chat.py', query]);

//             let scriptOutput = '';

//             pythonProcess.stdout.on('data', (data) => {
//                 scriptOutput += data.toString();
//             });

//             pythonProcess.stderr.on('data', (data) => {
//                 const output = data.toString();
//                 if (!output.includes('Some weights of the model checkpoint at') &&
//                     !output.includes('FutureWarning: `clean_up_tokenization_spaces` was not set.') &&
//                     !output.includes('Some weights of PegasusForConditionalGeneration were not initialized from the model checkpoint at')) {
//                     console.error(`Error: ${output}`);
//                     reject(output);
//                 }else{
//                     console.log(`Error: ${output}`);
//                 }
//             });

//             pythonProcess.on('close', (code) => {
//                 if (code !== 0) {
//                     reject(`Python script exited with code ${code}`);
//                 } else {
//                     resolve(JSON.parse(scriptOutput));
//                 }
//             });
//         });
//     }
// }

import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ChatService {

    async resolveQuery(query: string): Promise<any> {
        try {
            const response = await axios.post('https://<your-heroku-python-app>.herokuapp.com/query', { query });
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error('Error contacting Python service');
        }
    }
}
