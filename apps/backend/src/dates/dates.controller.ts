import { Body, Controller, Get, Post } from '@nestjs/common';
import { DatesService } from './dates.service';
import { parseISO } from 'date-fns';

interface dateTypes {
  year: string,
  month: string,
  days: number[]
}

@Controller('dates')
export class DatesController {
  private dateStrings: string[];

  constructor(private readonly appService: DatesService) {
    this.dateStrings = [
      '2024-09-01T22:00:00.000Z',
      '2024-09-02T22:00:00.000Z',
      '2024-09-09T22:00:00.000Z',
      '2024-09-04T22:00:00.000Z',
      '2024-09-12T22:00:00.000Z',
      '2024-09-06T22:00:00.000Z',
      '2024-10-18T22:00:00.000Z'
    ]
  }

  @Get()
  getHello(): string {
    const sortedDates = this.dateStrings.map(date => parseISO(date)).sort((a, b) => a.getTime() - b.getTime());
    const date1: dateTypes[] = [
      {
          year: '2024',
          month: '09',
          days: [
              1,2,3,5,7,9,10,11,13
            //   1,2,3,5
            ]
      }
  ]
  
    return this.appService.getHello(date1);
  }
}
