export default class cutomDateClass {
    currDate: Date;
    currYear: number;
    currMonth: number;
    currDay: string;
    monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    dayOfWeek = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];

    constructor() {
        this.currDate = new Date();
        this.currYear = this.currDate.getFullYear();
        this.currMonth = this.currDate.getMonth();
        this.currDay = this.currDate.getDay().toString();
    }
    
    getYearNumber(): number {
        return this.currYear;
    }

    getMonthName(): string {
        return this.monthNames[this.currMonth];
    }

    getMonthNumber(): number {
        return (this.currMonth + 1);
    }

    getFormattedMonthNumber(): string {
        let currMonth = this.currDate.getMonth();
        currMonth += 1;
        let newMonth:string = currMonth.toString();
        
        if (newMonth.length < 2) {
            newMonth = '0' + currMonth;
        }

        console.log(newMonth);

        return newMonth;
    }

    getDayOfWeek(index: number) {
        if (this.currDay.length < 2) {
            this.currDay = '0' + this.currDay;
        }

        if (index == 0) {
            const dateString: string = `${this.currYear}-${this.getFormattedMonthNumber()}-01`
            const date = new Date(dateString);
            console.log("DATE: " + date.toString())
            return this.dayOfWeek[date.getDay()]

        } else if (index == 1) {
            const dateString: string = `${this.currYear}-${this.getFormattedMonthNumber()}-02`
            const date = new Date(dateString);
            console.log("DATE: " + date.toString())
            return this.dayOfWeek[date.getDay()]
        } else {
            console.error("Could not return day of week, please pass 0 or 1 as function parameters")
        }
    }
}