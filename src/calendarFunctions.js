export function getNumberOfDaysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function getWeekday(date) {
    return date.getDay();
}

export function currentMonthDays(date) {
    let month = date.getMonth();
    let year = date.getFullYear();
    let daysInMonth = getNumberOfDaysInMonth(date);
    console.log(date);
    console.log(month);
    console.log(year);
    return [...Array(daysInMonth)].map((day, index) => {
        return {
            date: new Date(year, month, index + 1),
            dayOfMonth: index + 1,
            isCurrentMonth: true,
            get isCurrentDay() {
                return this.date.toDateString().includes(new Date().toDateString());
            },
        };
    });
}

export function previousMonthDays(date) {
    let month = date.getMonth();
    let year = date.getFullYear();
    let firstDayOfTheMonthWeekday = getWeekday(currentMonthDays(date)[0].date);
    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
        ? firstDayOfTheMonthWeekday
        : 6;
    const previousMonthLastSundayOfTheMonth = new Date(
        year,
        month,
        `${1 - visibleNumberOfDaysFromPreviousMonth}`
    ).getDate();
    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((_, index) => {
        return {
            dayOfMonth: previousMonthLastSundayOfTheMonth + index,
            isCurrentMonth: false,
        };
    });
}

export function nextMonthDays(date) {
    const lastDayOfTheMonthWeekday = getWeekday(
        currentMonthDays(date)[currentMonthDays(date).length - 1].date
    );
    console.log(lastDayOfTheMonthWeekday);
    const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
        ? 6 - lastDayOfTheMonthWeekday
        : 6;
    return [...Array(visibleNumberOfDaysFromNextMonth)].map((_, index) => {
        return {
            dayOfMonth: index + 1,
            isCurrentMonth: false,
        };
    });
}
