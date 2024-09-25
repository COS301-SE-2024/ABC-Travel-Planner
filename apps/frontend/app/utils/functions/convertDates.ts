import { parseISO } from 'date-fns'

interface dateTypes {
  year: string,
  month: string,
  days: number[]
}

export function createNewDates(dates: string[]): string {
   const sortedDates = dates.map(date => parseISO(date)).sort((a, b) => a.getTime() - b.getTime());
    
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

    return convertDates(dateObjects);
  }

export function convertDates(dates: dateTypes[]): string {
    let out = '';

    dates.forEach((date, idx) => {
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