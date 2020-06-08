const verifyButton = document.querySelector('#verifyButton');
const getFromTicketForm = document.querySelector('#ticketNumber');
let getFromTicketNumber;
    
verifyButton.addEventListener('click', () => {
    ticketNumber = getFromTicketForm.value;
    console.log("Verify.js : After button is clicked ", ticketNumber);
    deleteVerifyTicket(ticketNumber);

})

async function deleteVerifyTicket (ticketNum) {
    console.log( "Inside delete ticket function: " ,ticketNum);
    try{
       let url = `http://localhost:8000/whereitsat/removeTicket/?ticketId=${ticketNum}`;
       let response = await fetch(url, { method: 'DELETE' });
       let data = await response.json();
       return data;
    }catch (error){
        console.log("Error");
    }
   
   };