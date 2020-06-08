const lowdb = require ('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('database.json');
const database = lowdb(adapter);

exports.initiateDatabase = () => {
    const hasDatabase = database.has('Events').value();

    if(!hasDatabase){
        database.defaults({ Events: [] }).write();
    }
};
exports.getEvents = () => {
    return database.get('Events').value();
}

exports.getOrders = () => {
    return database.get('Orders').value();
}

exports.getTickets = () => {
    return database.get('Tickets').value();
}

exports.createEvent = (event) => {
  //  console.log("in database operations, event recieved from admin.js: " + event);
    let dbEvents = database.get('Events').value();
    let eventsLength = dbEvents.length; 
    console.log("in database operations, event length " + eventsLength);
    eventsLength = eventsLength + 1;

    database.get('Events').push({ 
        id: eventsLength,
        name: event.name, 
        place: event.place, 
        timeFrom: event.timeFrom,
        timeTill: event.timeTill,
        price: event.price, 
        tickets: 0, 
        totalTicket: parseInt(event.totalTicket),
        date: events.date }).write();

      

        const eventCreated = database.get('Events').find({ id: event.id }).value();
        console.log(" In database operations: ", eventCreated);
        return eventCreated;
  }
 
//-------------------------------------------FIND ITEM IN EVENTS------------------------------------------- */
//This function is only used in the functions.js. So no need to export it.
function findItemInOrders(itemToFind){
    const findInOrders = database.get('Orders').find({ id: itemToFind}).value();
    console.log(findInOrders);
    return findInOrders;
}

//-------------------------------------------GENERATE TICKET NUMBER------------------------------------------- */
function generateTicketNumber() {
    let alphaNumeric = "";
    var charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
    for (var i = 0; i < 3; i++){
        alphaNumeric += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    
    let randomNumber = Math.floor(Math.random() * (1000));
    let finalTicketNumber = alphaNumeric + randomNumber;
    console.log(alphaNumeric);
    return finalTicketNumber;
}
//-------------------------------------------ADD ITEM TO Events------------------------------------------- */
/*
exports.addItemInEvents = (index ) => {
    let itemtoAdd = parseInt(index);
    console.log('add Item In Events: ', itemtoAdd);

    return database.get('Events').push({ 
        id: 0,
        name: event.name, 
        place: event.place, 
        timeFrom: event.timeFrom,
        timeTill: event.timeTill,
        price: event.price, 
        tickets: 0, 
        totalTicket: parseInt(event.totalTicket),
        date: events.date 
        }).write();
} */
//-------------------------------------------ADD ITEM TO Orders------------------------------------------- */
exports.addItemInTickets = (index ) => {
    let itemtoAdd = parseInt(index);
    console.log('add Item In Tickets: ', itemtoAdd);

    let ticketNum = generateTicketNumber();

    /* NOT ADD THE SAME PRODUCT TO CART CHECK */     
    const checkInOrders = findItemInOrders(itemtoAdd);//find item in orders
    console.log('addItemInTickets getting from order: ', checkInOrders);

    const matchProduct = database.get('Tickets').push(checkInOrders).write();
    console.log(matchProduct);
    database.get('Tickets').find({ id: itemtoAdd }).assign({ ticketId: ticketNum }).write(); //change the ticket number when adding a ticket in orders

    alertMessage = {
        status : 'SUCCESS', message : "Item added in Tickets" };
        console.log(alertMessage);

    return alertMessage;
} 

//-------------------------------------------ADD ITEM TO Orders------------------------------------------- */
exports.addItemInOrders = (searchTerm) => {
    let count = 0;
    let itemtoAdd = parseInt(searchTerm);
    console.log(itemtoAdd);

    /* DISPLAY: error message if you try to add a product that does not exist.*/
    const matchProduct = database.get('Events').find({ id: itemtoAdd }).value();
    let ticketIndexToChange = database.get('Events').filter({ id: itemtoAdd }).map('tickets').value();
    ticketIndexToChange = parseInt(ticketIndexToChange);
    ticketIndexToChange = ticketIndexToChange - 1;
    
    console.log("ticket Index To Change: ", ticketIndexToChange);
    //console.log(matchProduct);

    if(matchProduct === undefined){
        alertMessage = {
            status : 'ERROR', message : "Invalid product ID. Enter correct ID. " };
            console.log(alertMessage);
    }else{
        alertMessage = {
            status : 'SUCCESS', message : "Valid ID. Item found in Events. "
        }
        console.log(alertMessage);
        count += 1;

    /* NOT ADD THE SAME PRODUCT TO CART CHECK */     
    const checkInOrders = findItemInOrders(itemtoAdd);//find item in orders
    
  
        database.get('Events').find({ id: itemtoAdd }).assign({ tickets: ticketIndexToChange }).write(); //change the ticket number when adding a ticket in orders
        console.log("The ticket number now: ", matchProduct.tickets);
        database.get('Orders').push(matchProduct).write();
        
        alertMessage = {
            status : 'SUCCESS', message : "Item added in the Orders"};
            console.log(alertMessage);
        }
  
    
    return alertMessage;
} 
//-------------------------------------------DELETE ITEM FROM CART------------------------------------------- */
/* 
exports.deleteItemFromCart = (itemToDelete) => {
    let removeItem= parseInt(itemToDelete);
    //console.log(removeItem);

    const checkInCartItem = findItemInCart(removeItem);//find item in cart
    //console.log(checkInCartItem);

    if(checkInCartItem !== undefined){
        database.get('Cart').remove(checkInCartItem).write();
        alertMessage = {
            status : 'SUCCESS', message : "Item removed from Cart" };
            console.log(alertMessage);
    }else{
        alertMessage = {
            status : 'ERROR', message : "Invalid request- Item not found in cart" };
        console.log(alertMessage);
    }    
}

exports.deleteCart = (allCartItems) => {
    database.get('Cart').remove(allCartItems).write();
    console.log('Cart deleted succesfully');
}
*/