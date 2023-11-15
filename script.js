import { objectFetch } from "./util.js";

// Setup API Parameters

const ftURL = 'https://flightera-flight-data.p.rapidapi.com/flight/info?flnr=';
const ftOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '666811c3damshbcdedc58cd6ad5ap1317ccjsnd388ead41b9b',
    'X-RapidAPI-Host': 'flightera-flight-data.p.rapidapi.com'
  }
};

// Setup a global object for current flight information

let flightInfo;

// Get elements from DOM that we are going to use:

const flightBox = document.getElementById("flightBox");
const flyButton = document.getElementById("flybutton");

// Setup a callback function to get flight information

const getInfo = async() =>{
    const flightFetch = ftURL + flightBox.value;
    const infoObj = await objectFetch(flightFetch,ftOptions);
    flightInfo = infoObj[0];
    console.log(flightInfo);
}

flyButton.addEventListener("click", getInfo);