

/*  --- EXAMPLE QUERY ---
const textReq = async() =>{
try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
};
*/

// Setup API Parameters

const url ='https://flightradar24-com.p.rapidapi.com/flights/detail?flight_id=';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3cb52b4f2fmsh629fc0299548133p1054f1jsnf1ff73b6d88a',
		'X-RapidAPI-Host': 'flightradar24-com.p.rapidapi.com'
	}
};

// Get elements from DOM that we are going to use:

const userFlightBox = document.getElementById("flightBox");
const flyButton = document.getElementById("flybutton");

// Setup a DOM element that we can use to provide API replies:

const replyBox = document.createElement('p');
replyBox.id = 'replybox';

const userRequest = async () =>
{
    // Setup our fetch URL
    const flightID = userFlightBox.value;
    const fetchURL = url + flightID;

    // Query the API
    try{
        const response = await fetch(fetchURL, options);

        // Convert the data to JS Obj
        const apiText = await response.text();
        const apiObj = await JSON.parse(apiText);
        console.log(apiObj);

        // Extract list of Airports
        let airports = [];
        for(airport in apiObj.data){
            airports.push(apiObj.data[airport].id);
        }
        
        // If we have multiple, let the user select


    }catch(error){
        console.log(error);
    }

};


flyButton.addEventListener("click", userRequest);