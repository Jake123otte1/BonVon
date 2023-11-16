import { objectFetch, openResponse, openSearch, makeResponse, searchError } from "./util.js";

// Setup API Parameters

const ftURL = 'https://flightera-flight-data.p.rapidapi.com/flight/info?flnr=';
const ftOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '54a31b100cmsh367d7903bb873d8p1afd20jsnb32eb7f4aa56',
    'X-RapidAPI-Host': 'flightera-flight-data.p.rapidapi.com'
  }
};

const frUrl = 'https://flight-radar1.p.rapidapi.com/flights/list-most-tracked';
const frOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '54a31b100cmsh367d7903bb873d8p1afd20jsnb32eb7f4aa56',
		'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
	}
};

// Setup a global object for current flight information

let flightInfo;

// Get elements from DOM that we are going to use:

const flightBox = document.querySelector("#flightBox");
const flyButton = document.querySelector("#flybutton");
const leaderList = document.querySelector("#listcontainer");
const leaderboard = document.querySelector(".leaderboard");
const returnButton = document.querySelector("#return");

// Populate the 'Top 10 Tracked Flights' Leaderboard

const popLeaderboard = async () =>
{
  // API request for current most tracked flights
  const leaderObj = await objectFetch(frUrl,frOptions);
  const leaderFlights = await leaderObj.data;

  let leaderItem;
  let leaderStr;
  let leaderInfo = [];
  leaderList.innerHTML = '';
  for(let i = 0; i < leaderFlights.length; i++){
    leaderInfo[0] = leaderObj.data[i].flight;
    leaderInfo[1] = leaderObj.data[i].from_iata;
    leaderInfo[2] = leaderObj.data[i].to_iata;

    leaderInfo[1] === null ? leaderInfo[1] = "???" : 0;
    leaderInfo[2] === null ? leaderInfo[2] = "???" : 0;
    leaderInfo[0] === null ? leaderInfo[0] = 'Unknown' : 0;
    
    leaderItem = document.createElement("li");
    leaderStr = `${leaderInfo[0]}, ${leaderInfo[1]} -> ${leaderInfo[2]}`;
    leaderItem.innerHTML = leaderStr;
    leaderList.appendChild(leaderItem);
  }

}

// Setup a callback function to get flight information

const getInfo = async() =>{

    // API call to get flight info
    const flightFetch = ftURL + flightBox.value;
    const infoObj = await objectFetch(flightFetch,ftOptions);
    console.log(infoObj);

    if(infoObj === "Error logged."){
      searchError();
      return 0;
    }
    
    // Populate fields
    flightInfo = infoObj[0];
    makeResponse(flightInfo);

    // Update UI
    openResponse();

}

popLeaderboard();
flyButton.addEventListener("click", getInfo);
returnButton.addEventListener("click",openSearch);

export { flightBox, flyButton, leaderboard };