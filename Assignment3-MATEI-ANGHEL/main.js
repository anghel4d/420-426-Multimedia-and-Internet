const url = "https://api.spacexdata.com/v3/"    // The root of SpaceX API

fetch(url)
    .then(response => response.json())
    .then(data => {
        doStuff(data)
    })
    .catch(function(error){
        console.log(error);
    });

function doStuff(data){
    console.log(data);
}
// Plan:
/*
Page 1 https://api.spacexdata.com/v3/launches/past
-Table of launches
>descending chronological order (latest -> oldest)
flight_num|mission_name|video|date
(color highlight differing if successful)
(click on a row to see deets and a pic of the ship?)

Page 2 https://api.spacexdata.com/v3/launches/next
-Countdown to next launch (in big bold letters, centered)
-Time since last launch underneath

Popup on table rows of page 2: Rocket deets when rocket name is clicked on

Site must pass aXe
*/