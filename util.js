import { flightBox, flyButton, leaderboard } from "./script.js"

const objectFetch = async (url, options) =>
{
    try{
        const response = await fetch(url,options);
        if(response.ok){
            const responseText = await response.text();
            const responseObject = await JSON.parse(responseText);
            return responseObject;
        }else{
            throw new Error("Request failed.");
        }
    }catch(error){
        console.log(error);
        return "Error logged.";
    }

}

const searchError = async () =>
{
    flyButton.style.width = "50%";
    flyButton.innerHTML = "Flight not found.";
    flyButton.style.border = "3px solid black";
    await new Promise(r => setTimeout(r, 1800));
    flyButton.style.border = "3px solid white";
    flyButton.style.width = "20%";
    flyButton.innerHTML = "Fly!";
}

const openResponse = () =>
{
    flightBox.style.display = "none";
    flyButton.style = "display: none";
    leaderboard.style = "display: none";
    document.getElementsByTagName("main")[0].style = "height: 800px; width: 60%;";
    const rbox = document.getElementsByClassName("rbox");
    rbox[0].style.display = "block";
    for(let i = 0; i < rbox.length; i++){
      rbox[i].style.display = "block";
    };
}

const openSearch = () =>
{
    flightBox.style = "display: static";
    flyButton.style = "display: static";
    leaderboard.style = "display: static";
    document.getElementsByTagName("main")[0].style = "height: 180px; width: 40%;";
    const rbox = document.getElementsByClassName("rbox");
    for(let i = 0; i < rbox.length; i++){
      rbox[i].style.display = "none";
    };
}

const makeResponse = (flightInfo) =>
{
    let flightNum = flightInfo.flnr;
    let origin = flightInfo.departure_name;
    let destination = flightInfo.arrival_name;
    let originTime = flightInfo.scheduled_departure_utc;
    let destinationTime = flightInfo.scheduled_arrival_utc;
    let status = flightInfo.status;

    let deptDay = parseInt(originTime[8]+originTime[9]);
    let deptHr = parseInt(originTime[11]+originTime[12]);
    let arrHr = parseInt(destinationTime[11]+destinationTime[12]);
    let deptMin = parseInt(originTime[14]+originTime[15]);
    let arrMin = parseInt(destinationTime[14]+destinationTime[15]);

    let duration;
    if(deptHr > arrHr){
        duration = (24-deptHr-1)*60 + (arrHr*60) + (60-deptMin) + (arrMin);
    }else{
        duration = (arrHr-deptHr-1)*60 + (60-deptMin) + (arrMin);
    }

    let currTime = new Date().toISOString();
    let currDay = parseInt(currTime[8]+currTime[9]);
    let currHr = parseInt(currTime[11]+currTime[12]);
    let currMin = parseInt(currTime[14]+currTime[15]);

    let offset;
    if(currDay > deptDay){
        offset = (24-deptHr-1)*60 + (60-deptMin) + (currHr*60) + (currMin);
    }else{
        offset = (currHr-deptHr-1)*60 + (60-deptMin) + (currMin);
    }
    if(offset <= 0){
        offset = 0;
        status = "Scheduled";
    }else{
        console.log(offset);
        console.log(duration);
        offset = Math.floor((offset/duration)*100);
        console.log(offset);
    }
    if(offset > 99){
        status = "Landed";
    }
    if(status === 'live'){
        status = "Flying";
    }else if(status === "sched"){
        status = "Scheduled";
        offset = 0;
    }

    document.getElementById("flnr").innerHTML = `Flight ${flightNum}`;
    document.getElementById("fltst").innerHTML = `Status: ${status}`;
    document.getElementById("progressbar").value = offset;

    document.querySelector(".route").innerHTML = `<h2 class="rbox">${origin}</h2><h2 class="rbox">${destination}</h2>`
    
    let originString = new Date(originTime).toLocaleString();
    originString = originString.slice(0);
    let destinationString = new Date(destinationTime).toLocaleString();
    destinationString = destinationString.slice(0);
    
    document.querySelector(".timing").innerHTML = `<h2 class="rbox">${originString}</h2><h2 class="rbox">${destinationString}</h2>`;

}

export { objectFetch, openResponse, openSearch, makeResponse, searchError };