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