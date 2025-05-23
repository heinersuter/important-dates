const oneDayMilliseconds = 1000 * 60 * 60 * 24;

class DateEvent {
    constructor(eventDate) {
        this.date = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
        let currentDate = new Date();
        this.currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

        this.totalDays = this.#calculateTotalDays();
        this.wholeYears = this.#calculateWholeYears();
        this.wholeMonths = this.#calculateWholeMonths();

        let sums = this.#calculateSum();
        this.sumYears = sums.sumYears;
        this.sumMonths = sums.sumMonths;
        this.sumWeeks = sums.sumWeeks;
        this.sumDays = sums.sumDays;
    }

    getDate() {
        return this.date;
    }

    getTotalDays() {
        return this.totalDays;
    }

    getWholeYears() {
        return this.wholeYears;
    }

    getWholeMonths() {
        return this.wholeMonths;
    }

    getSum() {
        return {
            sumYears: this.sumYears,
            sumMonths: this.sumMonths, 
            sumWeeks: this.sumWeeks, 
            sumDays: this.sumDays
        };
    }

    #calculateTotalDays() {
        return Math.round((this.currentDate.valueOf() - this.date.valueOf()) / oneDayMilliseconds);
    }

    #calculateWholeYears() {
        if (this.currentDate.getMonth() === this.date.getMonth() && this.currentDate.getDate() === this.date.getDate()) {
            return this.currentDate.getFullYear() - this.date.getFullYear();
        } else {
            return null;
        }
    }

    #calculateWholeMonths() {
        if (this.currentDate.getDate() === this.date.getDate()) {
            if (this.currentDate.getMonth() >= this.date.getMonth()) {
                return (this.currentDate.getFullYear() - this.date.getFullYear()) * 12 + this.currentDate.getMonth() - this.date.getMonth();
            } else {
                return (this.currentDate.getFullYear() - this.date.getFullYear()) * 12 - (this.date.getMonth() - this.currentDate.getMonth());
            }
        } else {
            return null;
        }
    }

    #calculateSum() {
        let date = new Date(this.date.valueOf());
        let day = date.getDate();

        let sumYears = 0;
        while (this.#addYear(date, day).valueOf() <= this.currentDate.valueOf()) {
            date = this.#addYear(date, day);
            sumYears++;
        }

        let sumMonths = 0;
        while (this.#addMonth(date, day).valueOf() <= this.currentDate.valueOf()) {
            date = this.#addMonth(date, day);
            sumMonths++;
        }

        let days = this.#differenceDays(date, this.currentDate);
        let sumWeeks = Math.floor(days / 7);
        let sumDays = days % 7;

        return {sumYears, sumMonths, sumWeeks, sumDays};
    }

    #addYear(date, wishDay) {
        let year = date.getFullYear() + 1;
        let month = date.getMonth();
        let day = wishDay;
        while (!this.#isDate(year, month, day)) {
            day--;
        }
        return new Date(year, month, day);
    }

    #addMonth(date, wishDay) {
        const january = 0;
        const december = 11;

        if (date.getMonth() === december) {
            return new Date(date.getFullYear() + 1, january, date.getDate());
        }
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = wishDay;
        while (!this.#isDate(year, month, day)) {
            day--;
        }
        return new Date(year, month, day);
    }

    #isDate(year, month, day) {
        const date = new Date(year, month, day);
        return year === date.getFullYear() && month === date.getMonth() && day === date.getDate();
    };

    #differenceDays(firstDate, secondDate) {
        return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDayMilliseconds)));
    }
}