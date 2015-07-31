/*
 * Loading libraries
 */
var fs = require("fs");

/*
 * Global variables
 */
var rebalancingPath0 = "../data/201402_rebalancing_data-000.csv";
var rebalancingPath1 = "../data/201402_rebalancing_data-001.csv";
var rentalOutputPath = "../data/rentalData.csv";
/**
 * Main Work Here :
 *   - Read one file, then the other
 *   - Compute the diff for each line to know how many bike left and entered the station
 */
fs.readFile(rebalancingPath0, 'utf8', function(err, data1) {
    console.log("# First file read");
    if (err)
        throw err;
    fs.readFile(rebalancingPath1, 'utf8', function(err, data2) {
        console.log("# Second file read");
        if (err)
            throw err;
        data1 = data1.split("\n");
        data2 = data2.split("\n");
        console.log('# Line splited');
        var fullCSV = "";
        var currentHour = new Date(Date.UTC(2013, 07, 29, 12, 0));
        var nextHour = new Date(Date.UTC(2013, 07, 29, 13, 0));
        var bikesIn = 0;
        var bikesOut = 0;
        var lastBikeCount = 0;
        var idStation = 0;
        fs.writeFileSync(rentalOutputPath, "station_id, bikeIn, bikeOut, date, time, day, holiday\n");
        //var data = data1.concat(data2);
        console.log("# Data consolidated");
        console.time("start_loop");

        function extractBikeData(data) {
            for (var i = 1; i < data.length; i++) {
                if (data[i].match(/^station_id/))
                    continue;
                var line = data[i].replace(/"/g, "").split(",");
                station_id = parseInt(line[0], "10");

                if ((station_id > 77 || station_id < 41) && station_id != 82)
                    continue;

                time = new Date(line[3] + " GMT");

                bikes_available = parseInt(line[1], "10");
                docks_available = parseInt(line[2], "10");

                if (i % 100000 == 0) {
                    fs.appendFileSync(rentalOutputPath, fullCSV);
                    console.timeEnd("start_loop");
                    console.time("start_loop");
                    fullCSV = "";
                    console.log("saving.. " + i);
                }

                if (time > nextHour) {
                    var dateStr = currentHour.toISOString().replace(/-/g, "/").split("T");
                    var toSave = idStation + ", " + bikesIn + ", " + bikesOut + ", " + dateStr[0] + ", " + dateStr[1].split(".")[0] + ", \"" + getDay(currentHour) + "\", " + isHoliday(currentHour);
                    fullCSV += toSave + "\n";

                    currentHour = new Date(time.getFullYear(), time.getMonth(), time.getDate(), time.getHours(), 0, 0);
                    nextHour = new Date(currentHour);
                    nextHour.setHours(nextHour.getHours() + 1);
                    bikesIn = bikesOut = 0;
                }

                var movement = bikes_available - lastBikeCount;
                if (idStation != station_id) {
                    idStation = station_id;
                    console.log("New Station: " + idStation);
                    movement = 0;
                    currentHour = new Date(Date.UTC(2013, 07, 29, 12, 0, 0));
                    nextHour = new Date(Date.UTC(2013, 07, 29, 13, 0, 0));
                    bikesIn = bikesOut = 0;
                }

                if (movement >= 0)
                    bikesIn += movement;
                else
                    bikesOut -= movement;

                lastBikeCount = bikes_available;
            }
            fs.appendFileSync(rentalOutputPath, fullCSV);
        }
        extractBikeData(data1)
        extractBikeData(data2)
        console.timeEnd("start_loop");

    });
});

/**
 * Identify a date as an holiday
 * @param  {Date}  date Date to test for holiday
 * @return {Boolean}      
 */
function isHoliday(date) {
    var day = date.toISOString().split("T")[0];
    if (day == "2013-09-02" 
        || day == "2013-10-14" 
        || day == "2013-11-11" 
        || day == "2013-11-28" 
        || day == "2013-11-29" 
        || day == "2013-12-25" 
        || day == "2014-01-01" 
        || day == "2014-01-20" 
        || day == "2014-01-31" 
        || day == "2014-02-17")
        return 1;
    else
        return 0;

}

/**
 * Return the day of the week of a given date
 * @param  {Date} date Date to test
 * @return {String}      Day of the week in english
 */
function getDay(date) {
    switch (date.getUTCDay()) {
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        case 0:
            return "Sunday";
    }
}