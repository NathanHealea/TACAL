/**
 * Project:
 * File: dev-tacal
 * Author: Nathan Healea
 * Created: 3/15/16
 */

/* Declaring UnitTest object */
var UnitTest = function (id) {

    this.today = new Date();
    /* Events for passing */
    this.events = {
        0: {
            title: 'Pass Post',
            date: formatDate(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()),
            wordcount: 364,
            is_wordsalad: 0
        },
        1: {
            title: 'Pass failed',
            date: formatDate(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 1),
            wordcount: 407,
            is_wordsalad: 1
        }
    };

    this.options = {
        id: 'cal1',
        event: this.events
    };
    this.optionsTwo = {
        id: 'cal2'
    };


    this.fail = 'FAILED';
    this.pass = 'PASSED';


    this.testInitialization();
    this.testDates();
    this.testMonths();
    this.testCurrentMonth();
    this.testCurrentDay();
    this.testCurrentYear();
    this.testCalendarConstruction();
    this.testAddDates();
    this.testDateIdentifier();

    var cal1 = new TACAL(this.options);
    cal1.showcurr();
    cal1.displayVars('Initialization');

    var cal2 = new TACAL(this.optionsTwo);
    cal2.showcurr();

    // Bind next and previous button clicks


};
/**
 * Display passing test message
 * @param test
 * @constructor
 */
UnitTest.prototype.DisplayPass = function (test) {
    $('#unittest').append(
        $('<div id="' + test + '" class="test pass"></div>').html(
            /*test + ": "
             + '<span style="color:green;">' + this.pass + '</span>'*/
            '<div class="test-name">' + test + '</div>'
        )
    );
};

/**
 * Displaying failing test message
 * @param test
 * @param expected
 * @param actual
 * @constructor
 */
UnitTest.prototype.DisplayFail = function (test, expected, actual) {
    $('#unittest').append(
        /*$('<div id="' + test + '""></div>').html(
         test + ": "
         + '<span style="color:red;">' + this.fail + '</span>'
         + '<span style="width:10px;" > </span>'
         + '<b>Expected:</b> ' + expected
         + '<span style="width:10px;" > </span>'
         + '<b>Actual:</b> ' + actual*/
        $('<div id="' + test + '" class="test fail"></div>').html(
            /*test + ": "
             + '<span style="color:green;">' + this.pass + '</span>'*/
            '<div class="test-name">' + test + '</div>'
            + '<div class="test-results">'
            + '<div class="test-expected"><strong>Expected: </strong>' + expected + '</div>'
            + '<div class="test-actual"><strong>Actual: </strong>' + actual + '</div>'
            + '</div>'
        )
    )
};

/**
 * Testing Initialization of TACAL
 */
UnitTest.prototype.testInitialization = function () {
    var test = "testInitialization";

    // Arrange
    var expected = false;
    /*var expectedDivId = this.options.id;*/
    var expectedDivId = 'divCal';
    var actualCal;
    var actualCal2;
    var actualDivId;

    // Act
    var cal = new TACAL(this.options);
    actualCal = isNUll(cal);
    var cal2 = new TACAL({
        id: 'divCal'
    });
    actualCal2 = isNUll(cal2);
    actualDivId = cal2.id;


    // Assert
    if (expected != actualCal) {
        this.DisplayFail(test, expected, actualCal);
        return;
    }

    if (expected != actualCal2) {
        this.DisplayFail(test, expected, actualCal);
        return;
    }

    if (expectedDivId != actualDivId) {
        this.DisplayFail(test, expectedDivId, actualDivId);
        return;
    }

    this.DisplayPass(test);
};

/**
 * Testing global variables DATES
 */
UnitTest.prototype.testDates = function () {
    var test = "testDates";

    // Arrange
    var expectedLength = 7;
    var actualLength;
    var expectedDay1 = 'Sun';
    var actualDay1;
    var expectedDay2 = 'Sat';
    var actualDay2;

    // Act
    var cal = new TACAL(this.options);
    actualLength = cal.DaysOfWeek.length;
    actualDay1 = cal.DaysOfWeek[0];
    actualDay2 = cal.DaysOfWeek[6];

    // Assert
    if (expectedLength != actualLength) {
        this.DisplayFail(test, expectedLength, actualLength);
        return;
    }

    if (expectedDay1 != actualDay1) {
        this.DisplayFail(test, expectedDay1, actualDay1);
        return;
    }

    if (expectedDay2 != actualDay2) {
        this.DisplayFail(test, expectedDay2, actualDay2);
        return;
    }

    this.DisplayPass(test);

};

/**
 * Testing global variables MONTHS
 */
UnitTest.prototype.testMonths = function () {
    var test = "testMonths";

    // Arrange
    var expectedLength = 12;
    var actualLength;
    var expectedMonth1 = 'January';
    var actualMonth1;
    var expectedMonth2 = 'December';
    var actualMonth2;

    // Act
    var cal = new TACAL(this.options);
    actualLength = cal.Months.length;
    actualMonth1 = cal.Months[0];
    actualMonth2 = cal.Months[11];

    // Assert
    if (expectedLength != actualLength) {
        this.DisplayFail(test, expectedLength, actualLength);
        return;
    }

    if (expectedMonth1 != actualMonth1) {
        this.DisplayFail(test, expectedMonth1, actualMonth1);
        return;
    }

    if (expectedMonth2 != actualMonth2) {
        this.DisplayFail(test, expectedMonth2, actualMonth2);
        return;
    }

    this.DisplayPass(test);

};

/**
 * Testing public variable current month
 */
UnitTest.prototype.testCurrentMonth = function () {
    var test = "testCurrentMonth";

    // Arrange

    var expectedDate = new Date().getMonth();
    var actualDate;

    // Act
    var cal = new TACAL(this.options);
    actualDate = cal.currMonth;

    // Assert
    if (expectedDate != actualDate) {
        this.DisplayFail(test, expectedDate, actualDate);
        return;
    }

    this.DisplayPass(test);

};

/**
 * Testing public variable current day
 */
UnitTest.prototype.testCurrentDay = function () {
    var test = "testCurrentDay";

    // Arrange

    var expectedDate = new Date().getDate();
    var actualDate;

    // Act
    var cal = new TACAL(this.options);
    actualDate = cal.currDay;

    // Assert
    if (expectedDate != actualDate) {
        this.DisplayFail(test, expectedDate, actualDate);
        return;
    }

    this.DisplayPass(test);

};

/**
 * Testing public variable current year
 */
UnitTest.prototype.testCurrentYear = function () {
    var test = "testCurrentYear";

    // Arrange

    var expectedDate = new Date().getFullYear();
    var actualDate;

    // Act
    var cal = new TACAL(this.options);
    actualDate = cal.currYear;

    // Assert
    if (expectedDate != actualDate) {
        this.DisplayFail(test, expectedDate, actualDate);
        return;
    }

    this.DisplayPass(test);
};

/**
 * Testing construction of calendar information
 */
UnitTest.prototype.testCalendarConstruction = function () {
    var test = "testCalendarConstruction";

    // Arrange
    var expected = false;
    var actual;
    var expectedLength = 7;
    var actualLength;

    // Act
    var cal = new TACAL(this.options);
    actual = isNUll(cal.calendar);

    // Assert
    if (expected != actual) {
        this.DisplayFail(test, expected, actual);
        return;
    }

    for (var i = 0; i < cal.calendar.length; i++) {
        // Act
        actualLength = cal.calendar[i].length;

        // Assert
        if (expectedLength != actualLength) {
            this.DisplayFail(test, expectedLength, actualLength);
            return;
        }
    }

    this.DisplayPass(test);

};

/**
 * Testing dates being added to the calendar
 */
UnitTest.prototype.testAddDates = function () {
    var test = "testAddDates";

    // Arrange
    var expected = new TACAL(this.options);
    var actual;

    // Act
    var cal = new TACAL(this.options);
    var counter = 0;

    for (var i = 0; i < cal.calendar.length; i++) {
        for (var j = 0; j < cal.calendar[i].length; j++) {

            actual = cal.calendar[i][j].date;

            // Assert
            if (expected.calendar[i][j].date != actual) {
                this.DisplayFail(test, expected, actual);
                return;
            }
            counter++;
        }
    }

    this.DisplayPass(test);
};

/**
 * Testing date identifier
 */
UnitTest.prototype.testDateIdentifier = function () {
    var test = "testDateIdentifier";

    // Arrange
    var expected;
    var actual;

    // Act
    var cal = new TACAL(this.options);
    for (var i = 0; i < cal.calendar.length; i++) {
        for (var j = 0; j < cal.calendar[i].length; j++) {
            actual = cal.calendar[i][j].id;

            // Appends a 0 if less then 10
            var month = ((cal.calendar[i][j].month < 10) ? '0' + cal.calendar[i][j].month : cal.calendar[i][j].month);

            // Appends a 0 if less then 10
            var date = ((cal.calendar[i][j].date < 10) ? '0' + cal.calendar[i][j].date : cal.calendar[i][j].date);

            expected = cal.calendar[i][j].year + '-' + month + '-' + date;
            // Assert
            if (expected != actual) {
                this.DisplayFail(test, expected, actual);
                return;
            }
        }
    }

    this.DisplayPass(test);
};

/**
 * Determins of a object is empty
 * @param obj
 * @returns {boolean}
 */
function isNUll(obj) {
    if (obj === undefined) {
        return true;
    }
    else if (obj === null || obj == 'null') {
        return true;
    }
    else if (obj == {}) {
        return true;
    }
    return false;

}

/**
 * formats a year month date
 * @param y (year)
 * @param m (month)
 * @param d (date)
 * @returns {string} (yyyy-mm-dd)
 */
function formatDate(y, m, d) {
    var month = ((m < 10) ? '0' + m : m);
    var date = ((d < 10) ? '0' + d : d);

    return y + '-' + month + '-' + date;
}


