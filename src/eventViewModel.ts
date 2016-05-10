/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="dateEvent.ts" />

namespace DaEv {

    export var together: DateEvent = new DateEvent(new Date(2012, 9 - 1, 30));
    export var married: DateEvent = new DateEvent(new Date(2015, 5 - 1, 30));
    export var yannik: DateEvent = new DateEvent(new Date(2015, 10 - 1, 28));

    export class EventViewModel {
        setValues(name: string, event: DateEvent): void {

            let days: number = event.getTotoalDays();
            $("#" + name + "Days").text(this.printDays(days));
            $("#" + name + "Date").text(event.getDate().toLocaleDateString());

            let years: number = event.getWholeYears();
            if (years != null) {
                $("#" + name + "YearsValue").text(`Das ${years == 1 ? "ist" : "sind"} ${this.printYears(years)}!!!`);
            }
            else {
                $("#" + name + "Years").hide();
            }

            let months: number = event.getWholeMonths();
            if (months != null && years == null) {
                $("#" + name + "MonthsValue").text(`Das ${months == 1 ? "ist" : "sind"} ${this.printMonths(months)}!`);
            }
            else {
                $("#" + name + "Months").hide();
            }

            if (years == null && months == null) {
                let sum = event.getSum();
                let total = sum.reduce((a, b) => a + b, 0);
                $("#" + name + "Sum").text(`Das ${total == 1 ? "ist" : "sind"} ${this.printArray(sum)}.`);
            }
            else {
                $("#" + name + "Sum").hide();
            }
        }

        private printArray(sum: number[]): string {
            let result = this.printYears(sum[0]);

            if (result.length > 0 && sum[1] > 0) {
                result += ", ";
            }
            result += this.printMonths(sum[1]);

            if (result.length > 0 && sum[2] > 0) {
                result += ", ";
            }
            result += this.printWeeks(sum[2]);

            if (result.length > 0 && sum[3] > 0) {
                result += ", " + this.printDays(sum[3])
            }

            var index = result.lastIndexOf(",");
            if (index > 0) {
                result = result.substr(0, index) + " und" + result.substr(index + 1);
            }
            return result;
        }

        private printYears(years: number): string {
            if (!years) {
                return "";
            }
            return years.toString() + (years == 1 ? " Jahr" : " Jahre");
        }

        private printMonths(months: number): string {
            if (!months) {
                return "";
            }
            return months.toString() + (months == 1 ? " Monat" : " Monate");
        }

        private printWeeks(weeks: number): string {
            if (!weeks) {
                return "";
            }
            return weeks.toString() + (weeks == 1 ? " Woche" : " Wochen");
        }

        private printDays(days: number): string {
            if (!days) {
                return "";
            }
            return days.toString() + (days == 1 ? " Tag" : " Tage");
        }
    }

    export var viewModel: EventViewModel = new EventViewModel();
}