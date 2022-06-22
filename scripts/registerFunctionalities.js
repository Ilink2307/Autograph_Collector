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

        sendRegisterRequest (url, userJSON)

    } catch (error) {
        console.error(error)
    }
}

function sendRegisterRequest (url, bodyText) {
    fetch(url, {
        method: 'POST',
        body: bodyText,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'text/plain'
        }
    }).then((response) => {
        return response.json()
    }).then((res) => {
        if (res.status === 201) {
            console.log("Post successfully created!")
        }
    }).catch((error) => {
        console.log(error)
    })
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