function validateFormOnSubmit(RegisterForm){
    return RegisterForm != null;
}

async function registerUser() {
    let email = document.getElementById("email").value;
    let username = document.getElementById("userName").value;
    let password = document.getElementById("password").value;
    let url = 'http://localhost:8081/register';


    if(!isRegisterInputValid(email, username, password)){
        alert("Input is not valid. Please try again!")
    }
    else{
        alert("Input valid. ")
        await registerApiCall(email, username, password, url);
        alert("COOKIE " + document.cookie)

    }

}

async function registerApiCall(email, username, password, url) {
    try {
        const user = {
            email: email,
            username: username,
            password: password
        }

        let userJSON = JSON.stringify(user);

        await sendRegisterRequest (url, userJSON)
        alert("IN API CALL")

    } catch (error) {
        console.error(error)
    }
}

async function sendRegisterRequest (url, bodyText) {
    alert("Inainte de fetch")
    await fetch(url, {
        method: 'POST',
        body: bodyText,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'text/plain'
        }

    }).then(response=>response.json())
        .then((res) => {
            window.location.href= 'mainScreen.html';
        }).catch((error) => {
            alert("Post NO!")
            console.log(error)
        })
}

function deleteAllCookies() {
    var cookies = document.cookie.split(" ");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

function isRegisterInputValid (email, username, password){

    if(username.length < 3 || username.length > 30 || password.length < 3)
        return false

    if (/^[0-9@._a-zA-Z]+$/.test(email) && /^[0-9@._a-zA-Z]+$/.test(password)){
        return true;
    }
    else{
        return false;
    }

}