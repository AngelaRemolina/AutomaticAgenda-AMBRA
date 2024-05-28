var today = new Date();
var anotherDate = new Date();
anotherDate.setDate(anotherDate.getDate() + 1);
var otherDate = new Date("May 29, 2024 11:13:00");
console.log("llegué :)",event);

// var events = [
//     {
//         id: "imwyx6S",
//         name: "Event #1",
//         description: "Lorem ipsum dolor sit amet.",
//         date: today,
//         type: "event"
//     },
//     {
//         id: "imwyS",
//         name: "Event #2",
//         description: "Lorem ipsum dolor sit amet.",
//         date: anotherDate,
//         type: "event"
//     }
//     ,
//     {
//         id: "imwy",
//         name: "Event #3",
//         description: "Lorem ipsum dolor sit amet.",
//         date: otherDate,
//         type: "event"
//     }
// ];

$(document).ready(function () {
    $('#calendar').evoCalendar({
        todayHighlight: true,
        calendarEvents: events,
        theme: 'Orange Coral',
    });
})