const logoutButton = document.querySelector('#logoutButton');

logoutButton.addEventListener('click', () => {
    sessionStorage.removeItem('auth');
    location.href = '/';
});

async function getEvent() {
    const url = 'http://localhost:8000/whereitsat/getEvents';

    const response = await fetch(url);
    const data = await response.json();

    return data;
}

let events;
let eventsLength;
async function getAllEvents() {
    events = await getEvent();
    eventsLength = events.length + 1;
    console.log("In the admin.js file: ", events);
    console.log("In the admin.js file: ", eventsLength);

    displayEvents(events);
}

getAllEvents();

function displayEvents(events) {
    console.log(events);
    const containerElem = document.querySelector('.allAdminEvents');

    for (let event of events) {
        //displaying event card
        let eventCard = document.createElement("div");
        eventCard.classList.add("adminEventCard");
        eventCard.setAttribute('id', event.id);

        //displying event name
        let eventName = document.createElement("h3");
        eventName.classList.add("adminEventName");
        eventName.innerHTML = event.name;

        //displaying Event place
        let eventPlace = document.createElement("h3");
        eventPlace.classList.add("adminEventPlace");
        eventPlace.innerText = event.place;

        //for total tickets
        let eventTotalTickets = document.createElement("h3");
        eventTotalTickets.classList.add("eventTotalTickets");
        eventTotalTickets.innerText = event.totalTicket;

        //displaying Etickets sold
        let eventTicketSold = document.createElement("h3");
        eventTicketSold.classList.add("eventTicketSold");
        eventTicketSold.innerText = event.tickets;

        eventCard.appendChild(eventName);
        eventCard.appendChild(eventPlace);
        eventCard.appendChild(eventTotalTickets);
        eventCard.appendChild(eventTicketSold);
        containerElem.appendChild(eventCard);
    }
}//end of display orders
async function createEventinDB(obj) {
    console.log("In createevent in DB function ", obj);
    const url = 'http://localhost:8000/whereitsat/create/createEvent ';
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: { "Content-Type": "application/json" }
    });

//    getEvent();
    let data = await response.json();
    return data;
}

/*
async function createEvent(event) {
    console.log("after button clicked: in admin.js. EVENT recieved: ", event);
    const url = 'http://localhost:8000/whereitsat/createEvent';
    
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(event),
        headers: { 'Content-Type': 'application/json' }
    });
    
    const data = await response.json();
    console.log( " returning DATA: in admin.js at create event function:", response);
    return await data;
}
*/
const formName = document.querySelector('#formName');
const formPlace = document.querySelector('#formPlace');
const fromDate = document.querySelector('#formDate');
const fromTime = document.querySelector('.fromTime');
const tillTime = document.querySelector('.tillTime');
const totalTickets = document.querySelector('.totalTickets');
const price = document.querySelector('.price');
const addEventButton = document.querySelector('.addEventButton');

addEventButton.addEventListener('click', () => {
    let obj = {
        id: eventsLength,
        name: formName.value,
        place: formPlace.value,
        timeFrom: fromTime.value,
        timeTill: tillTime.value,
        price: price.value,
        tickets: 0,
        totalTicket: totalTickets.value,
        date: fromDate.value
    }
    console.log("After button is clicked: ", obj);
    //   createEvent(obj);
    createEventinDB(obj);

})