import { Injectable } from '@nestjs/common';

interface dateTypes {
  month: string,
  days: number[]
}

@Injectable()
export class DatesService {
  getHello(dates: dateTypes[]): string {
    let out = '';
    console.log("Starting...")

    dates.forEach((date, idx) => {
        let startRange = date.days[0];
        let endRange = date.days[0];

        console.log("StartRange: " + startRange)
        console.log("EndRange: " + endRange)

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
    })

    out.substring(0, 2) === ', ' ? out = out.substring(2, out.length) : out;
    console.log(out)
    return out;
  }
}
