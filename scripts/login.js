async function login (){

    let email = document.getElementById("userName").value;
    let password = document.getElementById("password").value;
    let urlPath = 'http://localhost:8081/api/login' + '/' + email + '/' + password;
    console.log(urlPath);

    const response = await fetch(urlPath, {method: 'post'});





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
}

