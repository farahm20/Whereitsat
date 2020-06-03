const db = require('./database-operations');

module.exports = (app) => {
//'http://localhost:8000/whereitsat/getEvents'
    app.get('/whereitsat/', (request, response) => {
        response.send('<h1> Welcome to WHERE ITS AT </h1>');
    });

    

    //--------------------------------------------POST: add in Tickets ------------------------------------------- */
    //http://localhost:8000/whereitsat/addticket/?id=1
    app.post('/whereitsat/addticket', (req, res) => {
        const searchTerm = req.query.id;

        //console.log(req.url);
        //console.log(searchTerm);
    //    res.send('In add item to cart endpoint....');
        let obj = db.addItemInTickets(searchTerm);
  /*      let obj = {
            message: 'Adding item in cart....'        
         }*/
         res.send(JSON.stringify(obj));
         return obj;
    })

    //--------------------------------------------POST: add a specific product ------------------------------------------- */
    //http://localhost:8000/whereitsat/add/?id=1
    app.post('/whereitsat/add', (req, res) => {
        const searchTerm = req.query.id;
        //console.log(req.url);
        //console.log(searchTerm);
    //    res.send('In add item to cart endpoint....');
        let obj = db.addItemInOrders(searchTerm);
  /*      let obj = {
            message: 'Adding item in cart....'        
         }*/
         res.send(JSON.stringify(obj));
         return obj;
    })

    //-------------------------------------------DELETE: remove a specific product ------------------------------------------- */
    //http://localhost:8000/whereitsat/removeItem/?id=1
   
 /*
    app.delete('/whereitsat/removeItem', (req, res) => {
        const itemToDelete = req.query.id;
        console.log(req.url);
        console.log(itemToDelete);
    //    res.send('At item to delete from cart endpoint....');
        db.deleteItemFromCart(itemToDelete);
        let obj = {
            message: 'Removing item from cart....'
         }
         res.send(JSON.stringify(obj));
         console.log(obj);
    })
*/

    //-------------------------------------------DELETE: delete teh whole cart ------------------------------------------- */
    //http://localhost:8000/TechShop/deleteAllCart

/*
    app.delete('/TechShop/deleteAllCart/', (req, res) => {
        let allCartItems = req.params.id;
        console.log('At Cart delete endpoint....');
        console.log(allCartItems);
        db.deleteCart(allCartItems);
        res.send(allCartItems);
    });
*/

    //------------------------------------------- GET: get all of the products ------------------------------------------- */
    //http://localhost:8000/TechShop/getEvents
   app.get('/whereitsat/getEvents', (req, res) => {
    
        let allEvents = db.getEvents();
        res.send(JSON.stringify(allEvents));
        
        console.log('At get Events endpoint....');
    });

    //-------------------------------------------GET: get all Cart items ------------------------------------------- */
    //http://localhost:8000/whereitsat/getOrders
    app.get('/whereitsat/getOrders', (req, res) => {
        let allOrders = db.getOrders();
        res.send(JSON.stringify(allOrders));
        
        console.log('At get Orders endpoint....');
    });

    //-------------------------------------------GET: get all Tickets ------------------------------------------- */
    //http://localhost:8000/whereitsat/getTickets
    app.get('/whereitsat/getTickets', (req, res) => {
        let allTickets = db.getTickets();
        res.send(JSON.stringify(allTickets));
        
        console.log('At get Tickets endpoint....');
    });



    //all get or post functions will come here
}