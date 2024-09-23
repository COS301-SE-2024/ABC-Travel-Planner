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
    
    let days:any = []
    let dateObjects:any = []

    sortedDates.forEach((date, idx) => {
        const dateString = date.toISOString()
        let prevYear = dateString.substring(0,4)
        let prevMonth = dateString.substring(5,7)

        if (idx !== 0) {
            prevYear = sortedDates[idx-1].toISOString().substring(0,4)
            prevMonth = sortedDates[idx-1].toISOString().substring(5,7)
        }

        const year = dateString.substring(0,4)
        const month = dateString.substring(5,7)
        const day = dateString.substring(8,10)

        //Keep on adding the days into an array until month != prevMonth...
        if (month === prevMonth && year === prevYear) {
            days.push(day)
        } else {
            dateObjects.push({
                year: prevYear,
                month: prevMonth,
                days: days
            })

            days = []

            if (idx === sortedDates.length - 1) {
                dateObjects.push({
                    year: year,
                    month: month,
                    days: [day]
                })
            }
        }
    })

    dateObjects.forEach((item: any) => {
        console.log(JSON.stringify(item))
    })
  
    return this.appService.getHello(dateObjects);
  }
}
