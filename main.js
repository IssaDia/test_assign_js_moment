import moment from "moment";


const dates = [
  ["01.01.2000", "01.01.2016"],
  ["01.01.2016", "01.08.2016"],
  ["01.11.2015", "01.02.2017"],
  ["17.12.2016", "16.01.2017"],
  ["01.01.2016", "01.01.2016"],
  ["28.02.2015", "13.04.2018"],
  ["28.01.2015", "28.02.2015"],
  ["17.03.2022", "17.03.2023"],
  ["17.02.2024", "17.02.2025"],
];

const correctAnswers = [
  "16 years, total 5844 days",
  "7 months, total 213 days",
  "1 year, 3 months, total 458 days",
  "total 30 days",
  "total 0 days",
  "3 years, 1 month, total 1140 days",
  "1 month, total 31 days",
  "1 year, total 365 days",
  "1 year, total 366 days",
];

// Receive string of dates one after each other
 function outputDate(dates) {
   //get day,month and year separately for starting period

   const firstPeriodArrayValues = dates[0].match(
     /([0-9]{2})\.([0-9]{2})\.([0-9]{4})/
   );

   //get day,month and year separately for ending period
   const secondPeriodArrayValues = dates[1].match(
     /([0-9]{2})\.([0-9]{2})\.([0-9]{4})/
   );

   // build date object for starting period
   const startingPeriod = new Date(
     firstPeriodArrayValues[3],
     firstPeriodArrayValues[2],
     firstPeriodArrayValues[1]
   );

   // build date object for ending period
   const endingPeriod = new Date(
     secondPeriodArrayValues[3],
     secondPeriodArrayValues[2],
     secondPeriodArrayValues[1]
   );

   let startingPeriodWithMoment = moment(startingPeriod);
   let endingPeriodWithMoment = moment(endingPeriod);
   let yearDiff = endingPeriodWithMoment.diff(startingPeriodWithMoment, "year");
   let monthDiff =
     endingPeriodWithMoment.diff(startingPeriodWithMoment, "month") % 12;
   let dayDiff = endingPeriodWithMoment.diff(startingPeriodWithMoment, "day");

   function getDateElmValueToDisplay(dateElmValue, dateElmName) {
     if (dateElmName === "days") {
       return ` total ${dateElmValue} days`;
     }
     if (dateElmValue === 0) {
       return "";
     }
     if (dateElmValue === 1) {
       return `${dateElmValue} ${dateElmName.replace("s", "")},`;
     }
     if (dateElmValue > 1) {
       return `${dateElmValue} ${dateElmName},`;
     }
   }

   // return string with date values
   return `"${getDateElmValueToDisplay(
     yearDiff,
     "years"
   )}${getDateElmValueToDisplay(monthDiff, "months")}${getDateElmValueToDisplay(
     dayDiff,
     "days"
   )}"`;
 }
 

let results = "";

for (let oneDate in dates) {
  const value = outputDate(dates[oneDate]);
  const num = parseInt(oneDate) + 1;
  
  const answer =
  value === correctAnswers[oneDate]
  ? '<span style="color: #090">Correct</span>'
  : `<span style="color: #900">Incorrect</span>, correct is "${correctAnswers[oneDate]}"`;
  
  results += `${num} value: ${value} is ${answer}<br>`;
}

document.querySelector("#results").innerHTML = results;

