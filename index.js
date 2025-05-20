const heiner = new DateEvent(new Date(1979, 3 - 1, 20));
const sabine = new DateEvent(new Date(1979, 12 - 1, 24));
const together = new DateEvent(new Date(2012, 9 - 1, 30));
const married = new DateEvent(new Date(2015, 5 - 1, 30));
const yannik = new DateEvent(new Date(2015, 10 - 1, 28));
const nilas = new DateEvent(new Date(2018, 2 - 1, 11));
// civil registry: 30.04.2015
// engagement: 30.08.2014

function setValues(name, event) {
    const days = event.getTotalDays();
    document.getElementById(name + "Days").textContent = this.printDays(days);
    document.getElementById(name + "Date").textContent = event.getDate().toLocaleDateString();

    const years = event.getWholeYears();
    if (years != null) {
        document.getElementById(name + "YearsValue").textContent = `Das ${years === 1 ? "ist" : "sind"} ${this.printYears(years)}!!!`;
    } else {
        document.getElementById(name + "Years").style.display = "none";
    }

    const months = event.getWholeMonths();
    if (months != null && years == null) {
        document.getElementById(name + "MonthsValue").textContent = `Das ${months === 1 ? "ist" : "sind"} ${this.printMonths(months)}!`;
    } else {
        document.getElementById(name + "Months").style.display = "none";
    }

    if (years == null && months == null) {
        const sum = event.getSum();
        let total = sum.sumDays + sum.sumWeeks + sum.sumMonths + sum.sumYears;
        document.getElementById(name + "Sum").textContent = `Das ${total === 1 ? "ist" : "sind"} ${this.printArray(sum)}.`;
    } else {
        document.getElementById(name + "Sum").style.display = "none";
    }
}

function printArray(sum) {
    let result = this.printYears(sum.sumYears);

    if (result.length > 0 && sum.sumMonths > 0) {
        result += ", ";
    }
    result += this.printMonths(sum.sumMonths);

    if (result.length > 0 && sum.sumWeeks > 0) {
        result += ", ";
    }
    result += this.printWeeks(sum.sumWeeks);

    if (result.length > 0 && sum.sumDays > 0) {
        result += ", " + this.printDays(sum.sumDays);
    }

    const index = result.lastIndexOf(",");
    if (index > 0) {
        result = result.substring(0, index) + " und" + result.substring(index + 1);
    }
    return result;
}

function printYears(years) {
    if (!years) {
        return "";
    }
    return years.toString() + (years === 1 ? " Jahr" : " Jahre");
}

function printMonths(months) {
    if (!months) {
        return "";
    }
    return months.toString() + (months === 1 ? " Monat" : " Monate");
}

function printWeeks(weeks) {
    if (!weeks) {
        return "";
    }
    return weeks.toString() + (weeks === 1 ? " Woche" : " Wochen");
}

function printDays(days) {
    if (!days) {
        return "";
    }
    return days.toString() + (days === 1 ? " Tag" : " Tage");
}
