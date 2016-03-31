/**
 * Project: TACAL
 * File: TACAL.js
 * Author: Nathan Healea
 * Created: 3/29/16
 * Credited: CodePen.io username Mark
 * Url: http://codepen.io/xmark/pen/WQaXdv
 */

/**
 * Constructor for TACAL
 * @param divId
 * @constructor
 */
var TACAL = function (divId) {

    //Store div id
    this.divId = divId;

    // Days of week, starting on Sunday
    this.DaysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Months, stating on January
    this.Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Set the current month, year
    var d = new Date();

    this.currMonth = d.getMonth();
    this.currYear = d.getFullYear();
    this.currDay = d.getDate();

    // holds an 2d array for the calendar.
    // this allows us to add more information to be display in the calendar.
    this.calendar = this.init();
    this.addDate(this.currYear, this.currMonth);
};


/**
 * Return an array 5 X 7 fill with null
 * 5 weeks for the month
 * 7 days in a week
 * @returns {Array}
 */
TACAL.prototype.init = function () {
    var cal = new Array(5);
    for (var i = 0; i < 5; i++) {
        cal[i] = new Array(7).fill(null);
    }
    return cal;
};

/**
 * Goes to the next month
 */
TACAL.prototype.nextMonth = function () {
    if (this.currMonth == 11) {
        this.currMonth = 0;
        this.currYear = this.currYear + 1;
    }
    else {
        this.currMonth = this.currMonth + 1;
    }
    this.showcurr();
    this.addDate(this.currYear, this.currMonth);

};

/**
 * Goes to the previous month
 */
TACAL.prototype.previousMonth = function () {
    if (this.currMonth == 0) {
        this.currMonth = 11;
        this.currYear = this.currYear - 1;
    }
    else {
        this.currMonth = this.currMonth - 1;
    }
    this.showcurr();
    this.addDate(this.currYear, this.currMonth);
};

/**
 * Show current month
 */
TACAL.prototype.showcurr = function () {
    this.showMonth(this.currYear, this.currMonth);
};


/**
 * Shows given month and year
 * @param y (year)
 * @param m (month)
 */
TACAL.prototype.showMonth = function (y, m) {

    var d = new Date()
    // First day of the week in the selected month
        , firstDayOfMonth = new Date(y, m, 1).getDay()
    // Last day of the selected month
        , lastDateOfMonth = new Date(y, m + 1, 0).getDate()
    // Last day of the previous month
        , lastDayOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();


    var html = '<table>';

    // Write selected month and year
    html += '<thead><tr>';
    html += '<td colspan="7">' + this.Months[m] + ' ' + y + '</td>';
    html += '</tr></thead>';


    // Write the header of the days of the week
    html += '<tr class="days">';
    for (var i = 0; i < this.DaysOfWeek.length; i++) {
        html += '<td>' + this.DaysOfWeek[i] + '</td>';
    }
    html += '</tr>';

    // Write the days
    var i = 1;
    do {

        var dow = new Date(y, m, i).getDay();

        // If Sunday, start new row
        if (dow == 0) {
            html += '<tr>';
        }
        // If not Sunday but first day of the month
        // it will write the last days from the previous month
        else if (i == 1) {
            html += '<tr>';
            var k = lastDayOfLastMonth - firstDayOfMonth + 1;
            for (var j = 0; j < firstDayOfMonth; j++) {
                html += '<td class="not-current">' + k + '</td>';
                k++;
            }
        }

        // Write the current day in the loop
        var chk = new Date();
        var chkY = chk.getFullYear();
        var chkM = chk.getMonth();
        if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
            html += '<td class="today">' + i + '</td>';
        } else {
            html += '<td class="normal">' + i + '</td>';
        }
        // If Saturday, closes the row
        if (dow == 6) {
            html += '</tr>';
        }
        // If not Saturday, but last day of the selected month
        // it will write the next few days from the next month
        else if (i == lastDateOfMonth) {
            var k = 1;
            for (dow; dow < 6; dow++) {
                html += '<td class="not-current">' + k + '</td>';
                k++;
            }
        }

        i++;
    } while (i <= lastDateOfMonth);

    // Closes table
    html += '</table>';

    // Write HTML to the div
    document.getElementById(this.divId).innerHTML = html;
};

/**
 * Take a given year and month and fills in calendar with correct days.
 * @param y (year)
 * @param m (month)
 */
TACAL.prototype.addDate = function (y, m) {

    // Day of the week (ex: 0 = sun)
    var day = 0;
    // Indexer for the week we are adding dates to
    var week = 0;
    // Holds the current date being added (for current month)
    var date = 1;
    // Starting day of the current month
    var firstDayOfCurrentMonth = new Date(y, m, 1).getDay();
    // Last day of the current month
    var lastDayOfCurrentMonth = new Date(y, m + 1, 0).getDay();
    // Number of days in the current month (ex: july = 31)
    var numberOfDays = new Date(y, m + 1, 0 ).getDate();
    // Last day of the previous month
    var lastDayOfPreviousMonth = 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();
    /*
     Filling dates of previous month
     if the first day of the selected month
     is not on Sunday.
     */

    if (firstDayOfCurrentMonth != 1) {
        var lastMonthsDates = lastDayOfPreviousMonth - firstDayOfCurrentMonth + 1;
        for (var i = 0; i < firstDayOfCurrentMonth; i++) {
            this.calendar[week][day] = lastMonthsDates;
            lastMonthsDates++;
            day++;
        }
    }

    // Filling dates of the selected month
    do {
        do {
            this.calendar[week][day] = date;
            date++;
            day++;
        } while (( day < 7) && ( date < numberOfDays + 1));

        if (day == 7) {
            day = 0;
            week++;
        }

    } while (( week < 5) && ( date < numberOfDays + 1));

    /*
     Filling dates of next month
     if the last day of the selected month
     is not on Saturday.
     */
    if (lastDayOfCurrentMonth != 6 && day != 6) {
        var nextMonthsDates = 1;
        do {
            this.calendar[week][day] = nextMonthsDates;
            nextMonthsDates++;
            day++;

        } while (day < 7);
    }
};
/*// On Load of the window
 window.onload = function() {

 // Start calendar
 var c = new TACAL("divCal");
 c.showcurr();

 // Bind next and previous button clicks
 getId('btnNext').onclick = function() {
 c.nextMonth();
 };
 getId('btnPrev').onclick = function() {
 c.previousMonth();
 };
 };*/

/**
 * Get element by id
 * @param id
 * @returns {Element}
 */
function getId(id) {
    return document.getElementById(id);
}


TACAL.prototype.displayVars = function (event) {
    console.log('* - - - - - - Display Variables: '
        + event
        +' - - - - - - *');
    console.log("Div Id: " + this.divId);

    console.log("* - - Day Of Week - - *");
    console.log(this.DaysOfWeek);

    console.log("* - - Months - - *");
    console.log(this.Months);

    console.log("Current Month: " + this.currMonth);
    console.log("Current Day: " + this.currDay);
    console.log("Current Year: " + this.currYear);

    console.log("* - - Calendar Days - - *");
    console.log(this.calendar);

};