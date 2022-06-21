function validateFormOnSubmit(RegisterForm){
    return RegisterForm != null;
}

async function registerUser() {
    let email = document.getElementById("email").value;
    let username = document.getElementById("userName").value;
    let password = document.getElementById("password").value;
    let url = 'http://localhost:8081/register';
    let urlLogin = 'http://localhost:8081/login';

    await registerApiCall(email, username, password, url);
    alert("gata registerul")

    //deleteAllCookies();
    alert("COOKIE " + document.cookie)
    //await Login.loginApiCall(username, password, urlLogin);
    //alert("gata login")
    //alert(callLogin.testFunction(username));
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
function deleteAllCookies() {
    var cookies = document.cookie.split(" ");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}