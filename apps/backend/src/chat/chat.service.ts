import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ChatService {

    async resolveQuery(query: string): Promise<any> {
        try {
            const response = await axios.post('https://abctravelplanner-chat-2b29efdd65d3.herokuapp.com/query', { query });
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error('Error contacting Python service');
        }
    }
}
