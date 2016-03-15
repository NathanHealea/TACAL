/**
 * Project: TACAL
 * File: TACAL.js
 * Author: Nathan Healea
 * Created: 3/15/16
 */

/* Declaring TACAL object */
var TACAL;

/* Initializing TACAL object */
TACAL = TACAL || {};

/**
 * Days of the week
 * @type {string[]}
 */
TACAL.DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Months of the year
 * @type {string[]}
 */
TACAL.MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * Number of days in each month
 * @type {number[]}
 */
TACAL.CALDAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * Holds the current date
 * @type {Date}
 */
TACAL.TODAY = null;

/**
 * Sets TACAL information.
 */
$(function(){
    TACAL.TODAY = new Date();

    // Check if current month is February and if its a leap year
    if((TACAL.TODAY.getMonth() == 1) && TACAL.LeapYear()){

        // Change February calendar days from 28 to 29
        TACAL.CALDAYS[1] = 29;
    }
});

/**
 * Determines if the current year is a leap year.
 * @returns {boolean}
 */
TACAL.LeapYear = function(){
    var year = TACAL.TODAY.getFullYear();
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);

};