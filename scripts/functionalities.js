function openDropdown(elementId) {
    document.getElementById(elementId).classList.toggle("show");
}

async function addNewAutographFromMain() {
    let object = getObjectFromInputForms();
    let url = 'http://localhost:8081/new-autograph';
    await newAutographApiCall(object, url);
}

async function newAutographApiCall(object, url) {
    try {
        const newAutograph = {
            idUser: object.idUser,
            photo: object.photo,
            autographDate: object.autographDate,
            author: object.author,
            autographItem: object.autographItem,
            tags: object.tags,
            mentions: object.mentions,
            moment: object.moment
        }

        let newAutographJSON = JSON.stringify(newAutograph);

        await sendNewAutographRequest(url, newAutographJSON);

    } catch (error) {
        console.error(error)
    }
}

async function sendNewAutographRequest(url, newAutographJSON) {
    let responseBody

    await fetch(url, {
        method: 'POST',
        body: newAutographJSON,
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

function getObjectFromInputForms() {
    let object;
    let idUser = 3;
    let photo = 'p1';
    let autographDate = '08-02-12';
    let author = 'Nicki Minaj';
    let autographItem = 'sapca';
    let tags = 'cool, new, cute';
    let mentions = 'nice day';
    let moment = 'last summer';

    /*let photo = document.getElementById("autographPhoto").something to get pic
    autographDate = document.getElementById("autographDate").smth to get date
    author;
    if(!document.getElementById("autographAuthorCustom")) {
        author = document.getElementById("autographAuthorSelect").
    }*/

    object = {
        idUser,
        photo,
        autographDate,
        author,
        autographItem,
        tags,
        mentions,
        moment
    }
    return object;
}

///////////////////////////////////////////////////////// trebuie facut curat mai jos arata groaznic

function searchBarFunction(){

}

var modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById('myImg');
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}