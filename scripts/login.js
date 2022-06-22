async function login (){

    let username = document.getElementById("userName").value;
    let password = document.getElementById("password").value;

    let urlPath = 'http://localhost:8081/login';

    alert(urlPath);

    if(!isLoginInputValid(username, password)){
        alert("Input is not valid. Please try again!")
    }
    else{
        await loginApiCall(username, password, urlPath);
        //alert("Input  valid. ")
    }


}

async function loginApiCall(username, password, url) {
    try {
        const user = {
            username: username,
            password: password
        }

        let userJSON = JSON.stringify(user);
        let textResponse = await sendLoginRequest(url, userJSON);

        alert(textResponse.message);
        alert(textResponse.token);

        //document.cookie = textResponse.token;

         //deleteAllCookies();

        let cookieToken = document.cookie;
        alert("cookie "+ cookieToken)

       // let updatedToken = updateToken(textResponse.token);

        if(textResponse.message === 'User Not Registered'){
            alert("Incorrect username or password")
        }
        else{//if(Token.checkToken()===true){
            alert("CRAPI?")
            //location.replace( 'http://localhost:63342/Autograph_Collector/mainScreen.html')
            window.location.href= 'mainScreen.html';
        }

    } catch (error) {
        console.error(error);
    }
}

async function sendLoginRequest(url, bodyText) {
    let responseBody

    await fetch(url, {
        //credentials:'include',
        method: 'POST',
        body: bodyText,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'text/plain'
        }
    }).then(response=>response.json())
        .then(data=>{
            responseBody = data;
            alert("a Mers LoginRequest")
        }).catch(err => {
            alert("TE ROG")
            alert(err);
            console.error(err)
        });
    return responseBody;
}


function isLoginInputValid (username, password){

    if(username.length < 3 || username.length > 30 || password.length < 3)
        return false

    if (/^[0-9@._a-zA-Z]+$/.test(password)){
        return true;
    }
    else{
        return false;
    }

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

