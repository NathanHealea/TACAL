/**
 * Project:
 * File: dev-tacal
 * Author: Nathan Healea
 * Created: 3/15/16
 */

/* Declaring UnitTest object */
var UnitTest;

var id = 'divCal';

/* Initializing UnitTest object */
UnitTest = UnitTest || {};

/**
 * Runs all test on page load
 */
$(function () {


    UnitTest.testInitialization();
    UnitTest.testDates();
    UnitTest.testMonths();
    /*UnitTest.testCaldays();*/
    UnitTest.testCurrentMonth();
    UnitTest.testCurrentDay();
    UnitTest.testLeapYear();
    UnitTest.testCalendarConstruction();
    UnitTest.testAddDates();
    UnitTest.testDisplayCalendar();
    UnitTest.testGetUnixTime();
    UnitTest.testNextMonth();
});

// Defining Pass and Faill for consistency
UnitTest.PASS = "PASS";
UnitTest.FAIL = "FAIL";

/**
 * Display passing test message
 * @param test
 * @constructor
 */
UnitTest.DisplayPass = function (test) {
    $('#unittest').append(
        $('<div id="' + test + '""></div>').html(
            test + ": "
            + '<span style="color:green;">' + UnitTest.PASS + '</span>')
    );
};

/**
 * Displaying failing test message
 * @param test
 * @param expected
 * @param actual
 * @constructor
 */
UnitTest.DisplayFail = function (test, expected, actual) {
    $('#unittest').append(
        $('<div id="' + test + '""></div>').html(
            test + ": "
            + '<span style="color:red;">' + UnitTest.FAIL + '</span>'
            + '<span style="width:10px;" > </span>'
            + '<b>Expected:</b> ' + expected
            + '<span style="width:10px;" > </span>'
            + '<b>Actual:</b> ' + actual
        )
    )
};

/**
 * Testing Initialization of TACAL
 */
UnitTest.testInitialization = function () {
    var test = "testInitialization";

    // Arrange
    var expected = true;
    var actual;


    // Act
    var cal = new TACAL(id);
    actual = isNaN(TACAL);
    // Assert
    if (expected == actual) {
        UnitTest.DisplayPass(test)
    }
    else {
        UnitTest.DisplayFail(test, expected, actual);
        return
    }
};

/**
 * Testing global variables DATES
 */
UnitTest.testDates = function () {
    var test = "testDates";

    // Arrange
    var expectedLength = 7;
    var actualLength;
    var expectedDay1 = 'Sun';
    var actualDay1;
    var expectedDay2 = 'Sat';
    var actualDay2;

    // Act
    var cal = new TACAL(id);
    actualLength = cal.DaysOfWeek.length;
    console.log(actualLength);
    actualDay1 = cal.DaysOfWeek[0];
    actualDay2 = cal.DaysOfWeek[6];

    // Assert
    if (expectedLength != actualLength) {
        UnitTest.DisplayFail(test, expectedLength, actualLength);
        return;
    }

    if (expectedDay1 != actualDay1) {
        UnitTest.DisplayFail(test, expectedDay1, actualDay1);
        return;
    }

    if (expectedDay2 != actualDay2) {
        UnitTest.DisplayFail(test, expectedDay2, actualDay2);
        return;
    }

    UnitTest.DisplayPass(test);

};

/**
 * Testing global variables MONTHS
 */
UnitTest.testMonths = function () {
    var test = "testMonths";

    // Arrange
    var expectedLength = 12;
    var actualLength;
    var expectedMonth1 = 'January';
    var actualMonth1;
    var expectedMonth2 = 'December';
    var actualMonth2;

    // Act
    var cal = new TACAL(id);
    actualLength = cal.Months.length;
    actualMonth1 = cal.Months[0];
    actualMonth2 = cal.Months[11];

    // Assert
    if (expectedLength != actualLength) {
        UnitTest.DisplayFail(test, expectedLength, actualLength);
        return;
    }

    if (expectedMonth1 != actualMonth1) {
        UnitTest.DisplayFail(test, expectedMonth1, actualMonth1);
        return;
    }

    if (expectedMonth2 != actualMonth2) {
        UnitTest.DisplayFail(test, expectedMonth2, actualMonth2);
        return;
    }

    UnitTest.DisplayPass(test);

};

/**
 * Testing global variable CALDAYS
 */
/*UnitTest.testCaldays = function () {
    var test = "testCaldays";

    // Arrange
    var expectedLength = 12;
    var actualLength;
    var expectedDecember = 31;
    var actualDecember;
    var expectedFebruary = 28;
    var actualFebruary;

    // Act
    actualLength = TACAL.CALDAYS.length;
    actualDecember = TACAL.CALDAYS[11]; // December
    actualFebruary = TACAL.CALDAYS[1]; // February

    // Assert
    if (expectedLength != actualLength) {
        UnitTest.DisplayFail(test, expectedLength, actualLength);
        return;
    }

    if (expectedDecember != actualDecember) {
        UnitTest.DisplayFail(test, expectedDecember, actualDecember);
        return;
    }

    if (expectedFebruary != actualFebruary) {
        UnitTest.DisplayFail(test, expectedFebruary, actualFebruary);
        return;
    }

    UnitTest.DisplayPass(test);
};*/

/**
 * Testing public variable current month
 */
UnitTest.testCurrentMonth = function () {
    var test = "testCurrentMonth";

    // Arrange

    var expectedDate = new Date().getMonth();
    var actualDate;

    // Act
    var cal = new TACAL(id);
    actualDate = cal.currMonth;

    // Assert
    if (expectedDate != actualDate) {
        UnitTest.DisplayFail(test, expectedDate, actualDate);
        return;
    }

    UnitTest.DisplayPass(test);

};

/**
 * Testing public variable current day
 */
UnitTest.testCurrentDay = function () {
    var test = "testCurrentDay";

    // Arrange

    var expectedDate = new Date().getDay();
    var actualDate;

    // Act
    var cal = new TACAL(id);
    actualDate = cal.currDay;

    // Assert
    if (expectedDate != actualDate) {
        UnitTest.DisplayFail(test, expectedDate, actualDate);
        return;
    }

    UnitTest.DisplayPass(test);

};
/** Testing if february is a leap year */
UnitTest.testLeapYear = function () {
    var test = "testLeapYear";

    // Arrange
    var tempdate = TACAL.TODAY;
    var expectedCurrentYear = true; // tested for 2016
    var actualCurrentYear;
    var expected2013 = false; // tested for 2013
    var actual2013;


    // Act
    actualCurrentYear = TACAL.LeapYear();
    TACAL.TODAY.setFullYear(2013);
    TACAL.TODAY.setMonth(1);
    actual2013 = TACAL.LeapYear();

    // Clean Up for other test
    TACAL.TODAY = new Date();


    // Assert
    if (expectedCurrentYear != actualCurrentYear) {
        UnitTest.DisplayFail(test, expectedCurrentYear, actualCurrentYear);
        return;
    }

    if (expected2013 != actual2013) {
        UnitTest.DisplayFail(test, expected2013, actual2013);
        return;
    }


    UnitTest.DisplayPass(test);

};

/** Testing construction of calendar information */
UnitTest.testCalendarConstruction = function () {
    var test = "testCalendarConstruction";

    // Arrange
    var expected = true;
    var actual;
    var expectedLength = 7;
    var actualLength;

    // Act
    actual = isNaN(TACAL.CALENDAR);

    // Assert
    if (expected != actual) {
        UnitTest.DisplayFail(test, expected, actual);
        return;
    }

    for (var i = 0; i < TACAL.CALENDAR.length; i++) {
        // Act
        actualLength = TACAL.CALENDAR[i].length;

        // Assert
        if (expectedLength != actualLength) {
            UnitTest.DisplayFail(test, expectedLength, actualLength);
            return;
        }
    }

    UnitTest.DisplayPass(test);

};

/**
 * Test the building of the calendar
 */
UnitTest.testAddDates = function () {
    var test = "testAddDates";

    // Arrange
    var expected = false;
    var actual;

    // Act
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 7; j++) {

            actual = isNaN(TACAL.CALENDAR[i][j].date);

            // Arrange
            if (expected != actual) {
                UnitTest.DisplayFail(test, expected, actual);
                return;
            }

        }
    }

    UnitTest.DisplayPass(test);
};

/**
 * Test the displaying of the default calendar
 */
UnitTest.testDisplayCalendar = function () {
    var test = "testDisplayCalendar";

    // Arrange
    var id = 'cal';
    var expected = true;
    var actual;

    // Act
    $('#unittest').append('<div id="cal"></div>');

    TACAL.DisplayDefault(id);
    actual = isNaN($('#' + id).html());

    if (expected != actual) {
        UnitTest.DisplayFail(test, expected, actual);
        return;
    }

    UnitTest.DisplayPass(test);
};

/**
 * Test converting year, month, day to unix time.
 */
UnitTest.testGetUnixTime = function () {
    var test = "testGetUnixTime";

    // Arrange

    var expected = new Date(2016, 03, 24).getTime();
    var actual = false;

    // Act
    actual = TACAL.GetUnixTime(2016, 03, 24);
    if (expected != actual) {
        UnitTest.DisplayFail(test, expected, actual);
        return;
    }

    UnitTest.DisplayPass(test);
};

/**
 * Test next month button
 */

UnitTest.testNextMonth = function () {
    var test = "testNextMonth";

    // Arrange

    var expected = true;
    var actual = false;

    // Act
    if (expected != actual) {
        UnitTest.DisplayFail(test, expected, actual);
        return;
    }

    UnitTest.DisplayPass(test);
};


