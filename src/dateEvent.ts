namespace DaEv {
    export class DateEvent {
        private oneDay: number = 1000 * 60 * 60 * 24;

        private date: Date;
        private currentDate: Date;

        private totalDays: number;
        private wholeYears: number;
        private wholeMonths: number;

        private sumYears: number;
        private sumMonths: number;
        private sumWeeks: number;
        private sumDays: number;

        constructor(eventDate: Date) {
            this.date = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
            let currentDate: Date = new Date();
            this.currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

            this.calculateTotoalDays();
            this.calculateWholeYears();
            this.calculateWholeMonths();
            this.calculateSum();
        }

        getDate(): Date {
            return this.date;
        }

        getTotoalDays(): number {
            return this.totalDays;
        }

        getWholeYears(): number {
            return this.wholeYears;
        }

        getWholeMonths(): number {
            return this.wholeMonths;
        }

        getSum(): number[] {
            return [this.sumYears, this.sumMonths, this.sumWeeks, this.sumDays];
        }

        private calculateTotoalDays() {
            this.totalDays = Math.round((this.currentDate.valueOf() - this.date.valueOf()) / this.oneDay);
        }

        private calculateWholeYears() {
            if (this.currentDate.getMonth() == this.date.getMonth() && this.currentDate.getDate() == this.date.getDate()) {
                this.wholeYears = this.currentDate.getFullYear() - this.date.getFullYear();
            } else {
                this.wholeYears = null;
            }
        }

        private calculateWholeMonths() {
            if (this.currentDate.getDate() == this.date.getDate()) {
                if (this.currentDate.getMonth() >= this.date.getMonth()) {
                    this.wholeMonths = (this.currentDate.getFullYear() - this.date.getFullYear()) * 12 + this.currentDate.getMonth() - this.date.getMonth();
                }
                else {
                    this.wholeMonths = (this.currentDate.getFullYear() - this.date.getFullYear()) * 12 - (this.date.getMonth() - this.currentDate.getMonth());
                }
            } else {
                this.wholeMonths = null;
            }
        }

        private calculateSum() {
            let date = new Date(this.date.valueOf());
            let day = date.getDate();

            this.sumYears = 0;
            while (this.addYear(date, day).valueOf() <= this.currentDate.valueOf()) {
                date = this.addYear(date, day);
                this.sumYears++;
            }

            this.sumMonths = 0;
            while (this.addMonth(date, day).valueOf() <= this.currentDate.valueOf()) {
                date = this.addMonth(date, day);
                this.sumMonths++;
            }

            let days = this.differenceDays(date, this.currentDate);
            this.sumWeeks = Math.floor(days / 7);
            this.sumDays = days % 7;
        }

        private addYear(date: Date, wishDay: number): Date {
            let year: number = date.getFullYear() + 1;
            let month: number = date.getMonth();
            let day: number = wishDay;
            while (!this.isDate(year, month, day)) {
                day--;
            }
            return new Date(year, month, day);
        }

        private addMonth(date: Date, wishDay: number): Date {
            const january: number = 0;
            const december: number = 11;

            if (date.getMonth() == december) {
                return new Date(date.getFullYear() + 1, january, date.getDate());
            }
            let year: number = date.getFullYear();
            let month: number = date.getMonth() + 1;
            let day: number = wishDay;
            while (!this.isDate(year, month, day)) {
                day--;
            }
            return new Date(year, month, day);
        }

        private isDate(year: number, month: number, day: number): boolean {
            var date = new Date(year, month, day);
            return year === date.getFullYear() && month === date.getMonth() && day == date.getDate();
        };

        private differenceDays(firstDate: Date, secondDate: Date) {
            return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (this.oneDay)));
        }
    }
}