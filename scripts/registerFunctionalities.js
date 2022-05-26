function validateFormOnSubmit(RegisterForm){
    return RegisterForm != null;
}

function registerUser() {
    let email = document.getElementById("email").value;
    let username = document.getElementById("userName").value;
    let password = document.getElementById("password").value;

    let params = email+'/'+username+'/'+password;

    let url = 'http://localhost:8081/api/register/' + params;
    alert(url);

    let httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
        alert(' Cannot create an XMLHTTP instance');
        return false;
    }

    httpRequest.open('POST', url);

    httpRequest.onload = () => console.log(httpRequest.responseText);

    httpRequest.send();


}