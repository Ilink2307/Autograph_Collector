//import {updateToken} from "../token";

async function login (){

    let username = document.getElementById("userName").value;
    let password = document.getElementById("password").value;

    let urlPath = 'http://localhost:8081/login';

    alert(urlPath);

    await loginApiCall(username, password, urlPath);

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

       // let updatedToken = updateToken(textResponse.token);

        if(textResponse.message == 'User Not Registered'){
            alert("Incorrect username or password")
        }
        else{
            //if(Token.checkToken()===true){
                alert("CRAPI?")
                //location.replace( 'http://localhost:63342/Autograph_Collector/mainScreen.html')
                window.location.href= 'mainScreen.html';
           // }
            //else {
               // alert("DAR AICI CRAPI?")
           // }

        }

    } catch (error) {
        console.error(error);
    }


}
async function sendLoginRequest(url, bodyText) {
    let responseBody

    await fetch(url, {
        credentials:'include',
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





