function getCurrentDate() {
    const currentDate = new Date();

    // Get day, month, and year components from the current date
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
    const year = currentDate.getFullYear() % 100; // Get the last two digits of the year

    // Format day and month to have leading zeros if necessary
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;

    // Combine day, month, and year components into a string with the desired format
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

    return formattedDate;
}

module.exports = getCurrentDate;