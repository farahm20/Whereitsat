const { Router } = require('express');
const router = new Router();

const { initiateDatabase, getEvents, addEvent } = require('../models/database-operations');

router.post('/whereitsat/createEvent', async (req, res) => {
    initiateDatabase();
    const event = req.body;
    const createdEvent = await addEvent(event);
    console.log("Created Event: ", createdEvent);

    let resObj = {
        name: createdEvent.name,
        place: createdEvent.place,
        totalTicket: createdEvent.totalTicket,
        tickets: createdEvent.tickets }

        console.log('resObj', resObj);
        res.send(JSON.stringify(resObj));
});

router.get('/whereitsat/getEvents', async (req, res) => {
    let allEvents = await getEvents();
    console.log(allEvents);


    console.log('At get Events endpoint....');
    res.send(JSON.stringify(allEvents));
    
});