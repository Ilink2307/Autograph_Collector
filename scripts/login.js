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





