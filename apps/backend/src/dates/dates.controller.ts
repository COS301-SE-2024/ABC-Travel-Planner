import { Body, Controller, Get, Post } from '@nestjs/common';
import { DatesService } from './dates.service';
import { parseISO } from 'date-fns';

@Controller('dates')
export class DatesController {
  constructor(private readonly dateService: DatesService) {}

  @Get()
  getHello(): string {
    return `You've reached the dates-endpoint`;
  }

  @Post('convert')
  convertDates(@Body() body : {dates: string[]}): string {
    const sortedDates = body.dates.map(date => parseISO(date)).sort((a, b) => a.getTime() - b.getTime());
    
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

            if (idx === sortedDates.length - 1) {
                dateObjects.push({
                    year: year,
                    month: month,
                    days: days
                })
            }
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

    return this.dateService.convertDates(dateObjects);
  }
}
