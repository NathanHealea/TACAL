/**
 * Project:
 * File: dev-tacal
 * Author: Nathan Healea
 * Created: 3/15/16
 */

/* Declaring UnitTest object */
var UnitTest;

/* Initializing UnitTest object */
UnitTest = UnitTest || {};

/**
 * Runs all test on page load
 */
$(function () {

    UnitTest.testInitialization();
    UnitTest.testDates();
    UnitTest.testMonths();
    UnitTest.testCaldays();
    UnitTest.testToday();

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
        $('<div id="' + test + '""></div>').html(test + ": " + '<span style="color:green;">' + UnitTest.PASS + '</span>')
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
    actualLength = TACAL.DAYS.length;
    actualDay1 = TACAL.DAYS[0];
    actualDay2 = TACAL.DAYS[6];

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
    actualLength = TACAL.MONTHS.length;
    actualMonth1 = TACAL.MONTHS[0];
    actualMonth2 = TACAL.MONTHS[11];

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
UnitTest.testCaldays = function () {
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
};

/**
 * Testing global variable TODAY
 */
UnitTest.testToday = function () {
    var test = "testToday";

    // Arrange
    var expectedDate = new Date().toDateString();
    var actualDate;

    // Act
    actualDate = TACAL.TODAY.toDateString();

    // Assert
    if(expectedDate != actualDate){
        UnitTest.DisplayFail(test, expectedDate, actualDate);
        return;
    }

    UnitTest.DisplayPass(test);

};

