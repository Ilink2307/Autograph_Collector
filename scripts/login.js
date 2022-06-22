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

        if(textResponse.message == 'User Not Registered'){
            alert("Incorrect username or password")
        }
        else
            location.replace( 'http://localhost:63343/Autograph_Collector/mainScreen.html')

    } catch (error) {
        console.error(error);
    }


}
async function sendLoginRequest(url, bodyText) {
    let responseBody

    await fetch(url, {
        method: 'POST',
        body: bodyText,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'text/plain'
        }
    }).then(response=>response.json())
        .then(data=>{
            responseBody = data;
        })
        .catch(err => console.error(err));
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




