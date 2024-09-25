import { Injectable } from '@nestjs/common';

interface dateTypes {
  year: string,
  month: string,
  days: number[]
}

@Injectable()
export class DatesService {
  convertDates(dates: dateTypes[]): string {
    let out = '';

    dates.forEach((date) => {
        let startRange = date.days[0];
        let endRange = date.days[0];

        if (date.days.length === 1) {
            out += date.days[0];
        } 
        else {
            date.days.forEach((day, dayIdx) => {
                if (date.days[dayIdx+1] !== null) {
                  if (date.days[dayIdx+1] - day === 1) {
                    if (startRange === endRange) {
                      startRange = day;
                    }

                    endRange = date.days[dayIdx+1]
                  } else {
                    if (startRange !== endRange) {
                      out += `, ${startRange}-${endRange}`;
                      startRange = day;
                      endRange = day;
                    } else {
                      out += `, ${day}`
                    }
                  }
                } else {
                  if (startRange === endRange) {
                    out += `, ${day}`
                  } else {
                    out += `, ${startRange}-${endRange}`
                  }
                }
            })
        }

        let monthName = ''

        switch(date.month) {
            case '01': 
                monthName = 'Jan'
                break;
            case '02':
                monthName = 'Feb'
                break;
            case '03':
                monthName = 'Mar'
                break;
            case '04':
                monthName = 'Apr'
                break;
            case '05':
                monthName = 'May'
                break;
            case '06':
                monthName = 'Jun'
                break;
            case '07':
                monthName = 'Jul'
                break;
            case '08':
                monthName = 'Aug'
                break;
            case '09':
                monthName = 'Sep'
                break;
            case '10':
                monthName = 'Oct'
                break;
            case '11':
                monthName = 'Nov'
                break;
            case '12':
                monthName = 'Dec'
                break;
        }

        out += ` ${monthName} ${date.year}; `
    })

    out.substring(0, 2) === ', ' ? out = out.substring(2, out.length) : out;
    out = out.replaceAll('; , ','; ');
    return out;
  }
}
