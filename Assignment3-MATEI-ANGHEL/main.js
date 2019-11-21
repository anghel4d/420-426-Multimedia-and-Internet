const URLROOT = "https://api.spacexdata.com/v3/"    // The root of SpaceX API

// Timer Logic
let endDate = null;
let t = null;
function initializeTimer(){
	const path = "launches/next?filter=launch_date_utc,launch_site";
	fetch(URLROOT + path)
	.then(response => response.json())
	.then(data => {startTimer(data)})
	.catch(function(error){
		console.log(error);
	});
}

function startTimer(data){
	console.log(data);
	endDate = new Date(data.launch_date_utc).getTime();
	document.getElementById("nextDate").innerHTML = data.launch_date_utc.substring(0, 10) + " (UTC)";
	document.getElementById("nextSite").innerHTML = data.launch_site.site_name_long;
}

initializeTimer();
var updateTimer = setInterval(function() {
	t = endDate - Date.parse(new Date());	// Time remaining
	let secondsLeft = Math.floor( (t / 1000) % 60);
    let minutesLeft = Math.floor( (t /1000/60) % 60);
    let hoursLeft = Math.floor( (t / (1000 * 60 * 60)) % 24);
	let daysLeft = Math.floor(t / (1000 * 60 * 60 * 24));
	
	let clock = document.getElementById("timer-clock");
	let displaySeconds = clock.querySelector("#t-Seconds");
	let displayMinutes = clock.querySelector("#t-Minutes");
	let displayHours = clock.querySelector("#t-Hours");
	let displayDays = clock.querySelector("#t-Days");

	displaySeconds.innerHTML = secondsLeft;
	displayMinutes.innerHTML = minutesLeft + ":";
	displayHours.innerHTML = hoursLeft + ":";
	displayDays.innerHTML = daysLeft + ":";;

	if(t < 0){
		alert("Ship Launched!");
		clearInterval(updateTimer);
		initializeTimer();
	}
}, 1000);

// Table Logic


// Plan:
/*
Page 1 https://api.spacexdata.com/v3/launches/past?limit=3
-Table of launches
>descending chronological order (latest -> oldest)
flight_num|mission_name|video|date
(color highlight differing if successful)
(click on a row to see deets and a pic of the ship?)

Page 2 https://api.spacexdata.com/v3/launches/next
-Countdown to next launch (in big bold letters, centered)
-Time since last launch underneath

Popup on table rows of page 2: Rocket deets when rocket name is clicked on
*/