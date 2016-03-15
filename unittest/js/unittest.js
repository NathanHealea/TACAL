/**
 * Project:
 * File: dev-tacal
 * Author: Nathan Healea
 * Created: 3/15/16
 */

var UnitTest;
UnitTest = UnitTest || {};
$(function () {

    UnitTest.testInitialization();
    UnitTest.testDates();
    UnitTest.testMonths();

});

UnitTest.PASS = "PASS";

UnitTest.FAIL = "FAIL";

UnitTest.DisplayPass = function (test) {
    $('#unittest').append(
        $('<div id="' + test + '""></div>').html(test + ": " + '<span style="color:green;">' + UnitTest.PASS + '</span>')
    );
};

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

UnitTest.testInitialization = function () {

    // Arrange
    var test = "testInitialization";
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

UnitTest.testDates = function () {

    // Arrange
    var test = "testDates";
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

}
;

UnitTest.testMonths = function () {
    // Arrange
    var test = "testMonths";
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

