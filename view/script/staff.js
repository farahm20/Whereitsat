const buttonElem = document.querySelector('#loginButton');
const inputUser = document.querySelector('#username');
const inputPass = document.querySelector('#password');


async function saveToken(token) {
    sessionStorage.setItem('auth', token);
}

function getToken() {
    return sessionStorage.getItem('auth');
}

async function login(username, password) {
    const url = 'http://localhost:8000/whereitsat/auth/login';
    const obj = {
        username: username,
        password: password
    }
    console.log("Staff.js, username and password recieved ", obj );
    
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    return await data;
}

async function isLoggedIn() {
    const token = getToken();
    const url = 'http://localhost:8000/whereitsat/auth/isloggedin';

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    const data = await response.json();

    if (data.isLoggedIn) {
        location.href = 'http://localhost:8000/verify.html';
    }
}

buttonElem.addEventListener('click', async () => {
    const user = inputUser.value;
    const pass = inputPass.value;

    let loggedIn = await login(user, pass);

    if (loggedIn.success) {
        saveToken(loggedIn.token);
        setTimeout(() => {
            location.href = 'http://localhost:8000/verify.html'
        }, 100);
    } else {
        document.querySelector('#errorMessage').classList.toggle('hide');
    }
});

isLoggedIn();