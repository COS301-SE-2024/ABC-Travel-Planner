import { Controller, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('userQuery')
  async searchUser(@Query('query') query: string): Promise<any> {
    try {
      const result = await this.chatService.resolveQuery(query); 
      console.log(result);
      return result; 
    } catch (error) {
      console.error(error);
      return { error: 'An error occurred while processing your request.' };
    }
  }
}