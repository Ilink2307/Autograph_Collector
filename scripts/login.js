async function login (){

    let username = document.getElementById("userName").value;
    let password = document.getElementById("password").value;

    let urlPath = 'http://localhost:8081/login';

    alert(urlPath);

    //const response = await fetch(urlPath, {method: 'post'});
    await loginApiCall(username, password, urlPath);

}
async function loginApiCall(username, password, url) {
    try {
        const user = {
            username: username,
            password: password
        }

        let userJSON = JSON.stringify(user);
        sendLoginRequest(url, userJSON)

    } catch (error) {
        console.error(error)
    }

}
function sendLoginRequest(url, bodyText) {
    fetch(url, {
        method: 'GET',
        body: bodyText,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'text/plain'
        }
    }).then((response) => {
        return response.json()
    }).then((res) => {
        if (res.status === 200) {
            console.log("Successfully logged in!")
        }
    }).catch((error) => {
        console.log(error)
    })
}



    /*//const myJson = response.toString(); //extract JSON from the http response
    // do something with myJson
    //alert(myJson);
    let data = await response.json();


    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", urlPath, false ); // false for synchronous request
    xmlHttp.send( null );
    console.log(4);
    alert(xmlHttp.responseText);

    if(xmlHttp.responseText === 'success') {
        //send user to main if response is ok
        alert("ok");
    }
    else {
        alert("fail");
    }*/


