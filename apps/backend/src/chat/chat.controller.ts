import { Controller, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('userQuery')
  async searchUser(@Query('query') query: string): Promise<any> {
    try {
      return this.chatService.resolveQuery(query);
    } catch (error) {
        console.error(error)
    }
    
  }

}
