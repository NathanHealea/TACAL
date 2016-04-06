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
var TACAL = function (options) {
    /* * * Pre-defined Variables * * */
    // Days of week, starting on Sunday
    this.DaysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Months, stating on January
    this.Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Set the current month, year
    var d = new Date();

    this.currMonth = d.getMonth();
    this.currYear = d.getFullYear();
    this.currDay = d.getDate();
    this.currWeeks = this.getWeeksInMonth();

    // holds an 2d array for the calendar.
    // this allows us to add more information to be display in the calendar.
    this.calendar = this.init();


    /* * * Variables * * */
    // Store div id
    this.divId = null;

    // Stores events
    this.events = null;

    // Store css classes
    this.cssClass = null;

    // Stores css id
    this.cssId = null;

    this.setVariables(options);


    this.addDate(this.currYear, this.currMonth);
};
var Day = function(options){

    // Calendar information
    this.month = options;
    this.year =  null;
    this.day = null;

    // Events for that day
    this.event = null;

    // Id for the day
    this.id = null;

    // css to be applied to day when rendering.
    this.css = null;

    this.setVariables(options);

};

Day.prototype.setVariables= function(options){
    if(options == null){
        return;
    }
    var keys = Object.keys(options);

    for(var i in keys){
        if(this.hasOwnProperty(keys[i])){
            this[keys[i]]  = options[keys[i]];
        }
    }
};

/**
 * Sets option for TACAL
 * @param options
 */
TACAL.prototype.setVariables = function(options){
    if(options == null){
        options = {
            divId: 'divCal',
            cssClass:'not-current'
        }
    }
    var keys = Object.keys(options);

    for(var i in keys){
        if(this.hasOwnProperty(keys[i])){
          this[keys[i]]  = options[keys[i]];
        }
    }
};

/**
 * Return an array 5 X 7 fill with null
 * 5 weeks for the month
 * 7 days in a week
 * @returns {Array}
 */
TACAL.prototype.init = function () {
    var cal = new Array(this.currWeeks);
    for (var i = 0; i < this.currWeeks; i++) {
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
    this.currWeeks = this.getWeeksInMonth();
    this.calendar = this.init();
    this.addDate(this.currYear, this.currMonth);
    this.showcurr();

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

    this.addDate(this.currYear, this.currMonth);
    this.showcurr();
};

/**
 * Show current month
 */
TACAL.prototype.showcurr = function () {
    //this.showMonth(this.currYear, this.currMonth);
    this.showMonth();
};

/**
 * Displays the calendar with the selected months days
 */
TACAL.prototype.showMonth = function(){
    // --> Start calendar wrapper
    html = '';


    // --> Start table
    html += '<table>';

    // --> Start header
    html += '<thead>';

    // --> Start row
    html += '<tr>';
    // --> Write selected month and year
    html += '<td colspan="7">' + this.Months[this.currMonth] + ' ' + this.currYear + '</td>';
    html += '</tr>';
    // <--  End row

    html += '</theader>';
    // <-- End header

    // --> Start body
    html += '<tbody>';

    // displaying days of the week
    // --> Start row
    html += '<tr class="days">';
    for (var i = 0; i < this.DaysOfWeek.length; i++) {
        // --> Write the days of the week
        html += '<td>' + this.DaysOfWeek[i] + '</td>';
    }
    html += '</tr>';
    // <-- End row

    for (var row = 0; row < this.calendar.length; row++) {
        // --> Start table row
        html += '<tr>';
        for (var col = 0; col < this.calendar[row].length; col++) {
            if(this.calendar[row][col].current != true) {

                html += '<td class="' + this.cssClass + '">'
                    + this.calendar[row][col].date
                    + '</td>';
            }
            else{
                html += '<td>'
                    + this.calendar[row][col].date
                    + '</td>';
            }
        }
        html += '</tr>';
        // <-- End table row
    }
    html += '</tbody>';
    // <-- End body

    html += '</table>';
    // <-- End table

    html += '</div>';
    // <-- End calendar wrapper

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

    var lastMonth = null;
    var lastMonthYear = null;

    var nextMonth = null;
    var nextMonthYear = null;

    var options = null;

    // Calculating last month
    if( m - 1 == 0){
        lastMonth = 11;
        lastMonthYear = y -1;
    }
    else {
        lastMonth = m - 1;
        lastMonthYear = y;
    }

    // Calculating next month
    if(m + 1 == 12){
        nextMonth = 0;
        nextMonth = y + 1;
    }
    else{
        nextMonth = m + 1;
        nextMonthYear = y;
    }

    /*
     Filling dates of previous month
     if the first day of the selected month
     is not on Sunday.
     */
    if (firstDayOfCurrentMonth != 1) {
        var lastMonthsDates = lastDayOfPreviousMonth - firstDayOfCurrentMonth + 1;
        for (var i = 0; i < firstDayOfCurrentMonth; i++) {
            options =  {day:lastMonthsDates,month: lastMonth, year: lastMonthYear};
            this.calendar[week][day] = new Day(options);
                lastMonthsDates++;
            day++;
        }
    }

    // Filling dates of the selected month
    do {
        do {
            //this.calendar[week][day] = {date:date, month: this.currMonth, year: this.currYear, current:true};
            options =  {day:date,month: this.currMonth, year: this.currYear};
            this.calendar[week][day] = new Day(options);
            date++;
            day++;
        } while (( day < 7) && ( date < numberOfDays + 1));

        if (day == 7) {
            day = 0;
            week++;
        }

    } while (( week < this.currWeeks) && ( date < numberOfDays + 1));

    /*
     Filling dates of next month
     if the last day of the selected month
     is not on Saturday.
     */
     if (lastDayOfCurrentMonth != 6 && day < 7) {
        var nextMonthsDates = 1;
        do {
            //this.calendar[week][day] = {date:nextMonthsDates, month: nextMonth, year: nextMonthYear, current:false};
            options =  {day:nextMonthsDates,month: nextMonth, year: nextMonthYear};
            this.calendar[week][day] = new Day(options);
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

/**
 * Calculates the number of weeks in a month
 * @param y
 * @param m
 * @returns {number}
 */
TACAL.prototype.getWeeksInMonth = function() {
    var year         = this.currYear;
    var month_number = this.currMonth;
    var firstOfMonth = new Date(year, month_number, 1);
    var lastOfMonth  = new Date(year, month_number+1, 0);
    var used         = firstOfMonth.getDay() + lastOfMonth.getDate();
    return Math.ceil( used / 7);
};

TACAL.prototype.addEvent = function(date, event){

};

TACAL.prototype.getDateId = function(uniqueid, year, month, date){
    if(uniqueid != null && uniqueid == ' '){
        return uniqueid + '-' + year + '-' + month + '-' + '-' + date;
    }
    else{
        return year + '-' + month + '-' + '-' + date;
    }

};

/**
 * Displays tacal variables after an given event
 * @param event
 */
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
    console.log("Number of Weeks: " + this.currWeeks);

    console.log("* - - Calendar Days - - *");
    console.log(this.calendar);

    console.log("* - - Events - - *");
    console.log(this.events);

};